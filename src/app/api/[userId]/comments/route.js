import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET: retrieve all comments made by a given user
export async function GET(request, { params }) {
  await dbConnect();

  const existingUser = await User.findById(params.userId);

  // check if user exists
  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // retrieve all comments made by userId
  try {
    const allCommentsByUser = await Comment.find({ user: params.userId });

    // check if any comments have been made by the user
    if (allCommentsByUser.lenght === 0) {
      return NextResponse.json(
        { message: "There are 0 comments made by this user" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully retrieved all comments made by user",
        allCommentsByUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving all comments for user" },
      { status: 500 }
    );
  }
}
