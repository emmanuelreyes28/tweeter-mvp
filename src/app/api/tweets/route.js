import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// GET: retrieve all posts/tweets ever made
export async function GET(request, { params }) {
  await dbConnect();

  try {
    const allTweets = await Post.find({});

    return NextResponse.json(
      { message: "Successfully retrieved all tweets", allTweets },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving tweets for timeline" },
      { stauts: 500 }
    );
  }
}
