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
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return NextResponse.json(
        { message: "This email has an existing account" },
        { status: 400 }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username is already taken" },
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
