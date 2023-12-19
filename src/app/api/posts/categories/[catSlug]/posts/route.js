import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Post from "@/models/post";
import Category from "@/models/category";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const category = await Category.findOne({slug: params.catSlug});

    if( !category ) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    const posts = await Post.find({categories: category._id})
    .populate("author", "-password")
    .populate("categories")
    .sort({ createdAt: -1 });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
