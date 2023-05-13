import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const {
      body: { title, content },
      query: { id },
    } = req;

    const db = (await connectDB).db("forum");
    const post = await db.collection("post").findOne({ _id: new ObjectId(id) });

    const sessionLoggedIn = await getServerSession(req, res, authOptions);
    const { user } = sessionLoggedIn;

    if (user?.role === "admin" || post.auth === user.email) {
      // // 내용이 비어있다면 error
      if (title.trim() === "")
        return res.status(500).json("제목이 비어있습니다.");
      if (content.trim() === "")
        return res.status(500).json("내용이 비어있습니다.");
      // //수정하기로 보낸 title,content 가 수정전이랑 다르다면
      await db.collection("post").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            content,
          },
        }
      );

      return res.status(200).redirect(302, `/detail/${id}`);
    } else {
      return res.status(500).json("유저 정보가 일치하지 않습니다.");
    }
  }
}
