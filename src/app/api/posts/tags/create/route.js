import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { createUniqueSlug } from "@/utils/slugUtil";
import Tag from "@/models/tag";
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    await dbConnect();
    const res = await request.json();
    const { title, description } = res;

    if (!title ) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    let slug = await createUniqueSlug(title, Tag);

    const newTag = new Tag({
      title,
      slug,
      description
    });

    const tag = await newTag.save();

    revalidatePath('/(admin)/admin/posts/tags', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Tag created successfully!",
        success: true,
        tag
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
