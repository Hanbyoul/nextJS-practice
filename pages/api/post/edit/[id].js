import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const {
      body: { title, content },
      query: { id },
    } = req;

    //예외 처리

    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    //수정하기로 보낸 title,content 가 수정전이랑 동일하다면 pass
    if (title === result.title && content === result.content) {
      return res.status(204).redirect(302, `/detail/${id}`);
    }

    // 내용이 비어있다면 error
    if (title === "") return res.status(500).json("제목이 비어있습니다.");
    if (content === "") return res.status(500).json("내용이 비어있습니다.");

    //수정하기로 보낸 title,content 가 수정전이랑 다르다면
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
  }
  return res.end();
}
