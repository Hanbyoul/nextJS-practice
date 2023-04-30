import { connectDB } from "@components/app/util/database";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const {
      body: { title, content },
    } = req;

    //예외 처리
    if (title === "") return res.status(500).json("제목이 비어있습니다.");
    if (content === "") return res.status(500).json("내용이 비어있습니다.");

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").insertOne(req.body);
    return res.status(200).redirect(302, "/list");
  }
  return res.end();
}
