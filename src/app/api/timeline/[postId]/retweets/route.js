import dbConnect from "@/lib/dbConnect";
import Retweet from "@/models/Retweet";
import { NextResponse } from "next/server";

// GET: retrieve all retweets for given postId
export async function GET(request, { params }) {
  await dbConnect();

  try {
    const allRetweetsForPost = await Retweet.find({ post: params.postId });

    return NextResponse.json(
      {
        message: "Successfully retrieved all retweets for post",
        allRetweetsForPost,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving retweets for given post" },
      { status: 500 }
    );
  }
}
