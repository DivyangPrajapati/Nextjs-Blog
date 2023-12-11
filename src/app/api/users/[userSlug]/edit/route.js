import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { isValidEmail } from "@/utils/emailUtil";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
  try {
    await dbConnect();

      const res = await request.json();
      const { name, email, password, status = 1, role = "subscriber" } = res;

      const editedUser = await User.findOne({slug: params.userSlug}, {'email': 1});
      
      if( !editedUser ) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 400 }
        );
      }

      if (!name || !email) {
        return NextResponse.json(
          { success: false, message: "Please fill out all required fields." },
          { status: 400 }
        );
      }

      const isEmailExist = await User.findOne({
        $and: [
          { email },
          { _id: { $ne: editedUser.id } }
        ]
      });

    if (isEmailExist) {
      return NextResponse.json(
        { success: false, message: "Email address already exist." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let updatedUser = {
      name,
      email,
      role,
      status
    };

    if( password ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      updatedUser = { ...updatedUser, password: hashedPassword};
    }

    const user = await User.findOneAndUpdate({slug: params.userSlug}, {$set: updatedUser}, { new: true } );

    revalidatePath('/(admin)/admin/users', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "User updated successfully!",
        success: true,
        user,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
