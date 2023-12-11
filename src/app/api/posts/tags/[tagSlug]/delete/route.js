import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import { revalidatePath } from 'next/cache';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const deleteTag = await Tag.findOneAndDelete({ slug: params.tagSlug });
    
    if (!deleteTag) {
      return NextResponse.json({ message: "Tag not found", success: false }, { status: 404 });
    }

    revalidatePath('/(admin)/admin/posts/tags', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json({ message: "Tag deleted successfully!", success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}