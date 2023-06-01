import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

// when post page is created will need to pass userId within url or other method
export async function POST(request, { params }) {
  await dbConnect();
  const data = await request.json();

  // destructure data object
  const { content } = data;

  try {
    const existingUser = await User.findById(params.userId);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // create post and associate it with the user
    const post = new Post({
      user: params.userId,
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
