import Post from "@/models/Post";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";

// when post page is created will need to pass userId within url or other method
export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  // destructure data object
  const { username, content } = data;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // create post and associate it with the user
    const post = new Post({
      user: existingUser._id,
      content,
    });

    // save post to db
    await post.save();

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
