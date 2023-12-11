import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
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

    let updatedTag = {
      title,
      description
    };

    const tag = await Tag.findOneAndUpdate({slug: params.tagSlug}, {$set: updatedTag}, { new: true } );

    revalidatePath('/(admin)/admin/posts/tags', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Tag updated successfully!",
        success: true,
        tag,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
