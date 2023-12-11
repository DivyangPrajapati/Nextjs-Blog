import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Post from "@/models/post";
import { revalidatePath } from 'next/cache'
import fs from 'fs';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const deletePost = await Post.findOneAndDelete({ slug: params.postSlug });
    
    if (!deletePost) {
      return NextResponse.json({ message: "Post  not found", success: false }, { status: 404 });
    }

    fs.unlinkSync(`public${deletePost.thumbnail}`);

    revalidatePath('/(admin)/admin/posts', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json({ message: "Post deleted successfully!", success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
