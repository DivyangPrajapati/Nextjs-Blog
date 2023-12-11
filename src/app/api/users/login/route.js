import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const res = await request.json();
    const { email, password } = res;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    const signUser = await User.findOne({ email, status: true });
    if (!signUser) {
      return NextResponse.json(
        { success: false, message: "User does not exist." },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, signUser.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password. Please try again.",
        },
        { status: 400 }
      );
    }

    //const payload = { ...signUser };
    // delete payload.password;

    // Or create payload
    const payload = {
      id: signUser._id,
      name: signUser.name,
      slug: signUser.slug,
      email: signUser.email,
      role: signUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "User login successfully!",
      success: true,
      token,
      user: payload
    });

    response.cookies.set("token", token, {
        httpOnly: true, 
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
