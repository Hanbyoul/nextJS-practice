import { connectDB } from "@components/app/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const sessionLoggedIn = await getServerSession(req, res, authOptions);
  console.log("로그인 유저 정보", sessionLoggedIn);
  if (req.method == "POST") {
    const {
      body: { title, content },
    } = req;

    //예외 처리
    if (title === "") return res.status(500).json("제목이 비어있습니다.");
    if (content === "") return res.status(500).json("내용이 비어있습니다.");
    if (sessionLoggedIn) {
      // request.body 에 user 정보를 추가한다.
      req.body.auth = sessionLoggedIn.user.email;
    }

    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne(req.body);
    return res.status(200).redirect(302, "/list");
  }
  return res.end();
}
