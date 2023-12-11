import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { createUniqueSlug } from "@/utils/slugUtil";
import Category from "@/models/category";
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    await dbConnect();
    const res = await request.json();
    const { title, description, parentCategory = null } = res;

    if (!title ) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    let slug = await createUniqueSlug(title, Category);

    const newCategory = new Category({
      title,
      slug,
      description,
      parentCategory: (parentCategory !== '' ? parentCategory : null)
    });

    const category = await newCategory.save();

    revalidatePath('/(admin)/admin/posts/categories', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Category created successfully!",
        success: true,
        category,
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
