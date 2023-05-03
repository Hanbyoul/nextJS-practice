import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // id 를 받아서 , DB에  존재하는id 인지 한번더 체크한다.
  const id = req.body;
  const db = (await connectDB).db("forum");
  const post = await db.collection("post").findOne({ _id: new ObjectId(id) });
  if (!post) return res.status(500).json("유저 정보가 일치하지 않습니다.");

  //로그인유저 정보를 받아온다.
  const sessionLoggedIn = await getServerSession(req, res, authOptions);
  const { user } = sessionLoggedIn;

  //관리자 계정이면
  if (user?.role === "admin") {
    await db.collection("post").deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json("완료");
  }

  //작성자 , 로그인한 user email이 일치하지 않다면
  if (post.auth !== user.email) {
    return res.status(500).json("유저 정보가 일치하지 않습니다.");
  }

  await db.collection("post").deleteOne({ _id: new ObjectId(id) });

  return res.status(200).json("완료");
}
