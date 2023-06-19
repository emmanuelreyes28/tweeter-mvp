import bcrypt from "bcrypt";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  const { username, password } = data;

  try {
    // check if user exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        return NextResponse.json(
          { message: "User successfully authenticated" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Password is incorrect" },
          { status: 403 }
        );
      }
    }
    // user is not found
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
