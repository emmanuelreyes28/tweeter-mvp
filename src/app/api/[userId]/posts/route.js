import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET: retrieve all posts from user given userId
export async function GET(request, { params }) {
  await dbConnect();

  // retrive all posts for Post model for given userId
  try {
    // check if user exists
    const existingUser = await User.findById(params.userId);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const allPostsByUser = await Post.find({ user: params.userId });

    // check if there are any post made by user
    if (allPostsByUser.length === 0) {
      return NextResponse.json(
        { message: "There are 0 posts made by this user" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully retieved all post by user",
        allPostsByUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error getting all posts for given userId" },
      { status: 500 }
    );
  }
}
