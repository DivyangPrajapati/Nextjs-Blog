import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { revalidatePath } from 'next/cache';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const deleteUser = await User.findOneAndDelete({ slug: params.userSlug });
    
    if (!deleteUser) {
      return NextResponse.json({ message: "User  not found", success: false }, { status: 404 });
    }

    revalidatePath('/(admin)/admin/users', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json({ message: "User deleted successfully!", success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
