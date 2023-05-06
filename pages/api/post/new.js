import { connectDB } from "@components/app/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const sessionLoggedIn = await getServerSession(req, res, authOptions);

  if (req.method == "POST") {
    const {
      body: { title, content },
    } = req;

    const { image } = req.query;

    //예외 처리
    if (title === "") return res.status(500).json("제목이 비어있습니다.");
    if (content === "") return res.status(500).json("내용이 비어있습니다.");
    if (sessionLoggedIn) {
      // request.body 에 user 정보를 추가한다.
      req.body.auth = sessionLoggedIn.user.email;
    }

    const posting = {
      title,
      content,
      image,
    };
    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne(posting);
    return res.status(200).redirect(302, "/list");
  }
  return res.end();
}
