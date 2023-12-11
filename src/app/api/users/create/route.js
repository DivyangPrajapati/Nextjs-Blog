import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { createUniqueSlug } from "@/utils/slugUtil";
import { isValidEmail } from "@/utils/emailUtil";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    await dbConnect();

    const res = await request.json();
    const { name, email, password, status = 1, role = "subscriber" } = res;

    let userRole = role;

    // Force create an admin if no admin exists.
    if( role !== 'administrator') {
      const adminUserCount = await User.countDocuments({ role: 'administrator' });
      if( adminUserCount === 0) {
        userRole = "administrator";
      }
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    const isEmailExist = await User.findOne({ email });
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

    let slug = await createUniqueSlug(name, User);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const validStatus = (status === 1) ? 1 : 0;

    const newUser = new User({
      name,
      email,
      slug,
      password: hashedPassword,
      role: userRole,
      status: validStatus
    });

    const user = await newUser.save();

    revalidatePath('/(admin)/admin/users', 'page'); // Purge the cache of the Fetch API

    return NextResponse.json(
      {
        message: "User created successfully!",
        success: true,
        user,
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
