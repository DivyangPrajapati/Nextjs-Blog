import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Category from "@/models/category";
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
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

    let updatedCat = {
      title,
      description,
      parentCategory: (parentCategory !== '' ? parentCategory : null)
    };

    const category = await Category.findOneAndUpdate({slug: params.catSlug}, {$set: updatedCat}, { new: true } );

    revalidatePath('/(admin)/admin/posts/categories', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "Category updated successfully!",
        success: true,
        category,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
