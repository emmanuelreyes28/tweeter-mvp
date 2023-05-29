import dbConnect from "@/lib/dbConnect";
import Like from "@/models/Like";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// GET: get the number of likes for a given post using its id
export async function GET(request, { params }) {
  await dbConnect();

  // retrieve all likes from Like model that have the given postId
  try {
    const numberOfLikes = await Like.countDocuments({ post: params.postId });

    return NextResponse.json(
      { message: "Successfully counted likes for post", numberOfLikes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error counting likes for given postId" },
      { status: 500 }
    );
  }
}
