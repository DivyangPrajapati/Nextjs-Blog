import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Category from "@/models/category";
import { revalidatePath } from 'next/cache';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const deleteCategory = await Category.findOneAndDelete({ slug: params.catSlug });
    
    if (!deleteCategory) {
      return NextResponse.json({ message: "Category not found", success: false }, { status: 404 });
    }

    revalidatePath('/(admin)/admin/posts/categories', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json({ message: "Category deleted successfully!", success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}