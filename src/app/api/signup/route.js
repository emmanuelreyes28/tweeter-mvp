import bcrypt from "bcrypt";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  // destructure data object
  const { username, email, password } = data;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // encrypt password with 10 salting rounds
    const hashedPsswd = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPsswd,
    });

    // save user to db
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfuly" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
