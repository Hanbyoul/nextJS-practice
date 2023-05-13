import { connectDB } from "@components/app/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    console.log(req.body);
    console.log(req.query);

    const { body, query } = req;

    const db = (await connectDB).db("forum");
    const sessionLoggedIn = await getServerSession(req, res, authOptions);
    const { user } = sessionLoggedIn;

    const newComment = {
      content: body,
      parent: new ObjectId(query.id),
      author: user.email,
    };

    // //로그인 상태 체크
    // //댓글 공백 체크

    await db.collection("Comments").insertOne(newComment);
    const postComment = await db
      .collection("Comments")
      .find({ parent: new ObjectId(query.id) })
      .toArray();

    return res.status(200).json(postComment);
  }

  if (req.method === "GET") {
    const id = req.query.id;
    const db = (await connectDB).db("forum");
    const postComment = await db
      .collection("Comments")
      .find({ parent: new ObjectId(id) })
      .toArray();

    return res.status(200).json(postComment);
  }
}
