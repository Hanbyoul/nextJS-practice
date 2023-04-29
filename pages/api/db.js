import { connectDB } from "@components/app/util/database";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").find().toArray();

  if (req.method == "POST") {
    return res.status(200).json("POST요청");
  }

  console.log(req.method);
  return res.status(200).json(result);
}

// 숙제1
// GET요청을 하면 DB에 있던 컬렉션의 모든데이터 보내주기

// 숙제2
// 특정url로 GET요청을 하면 현재시간을 보내주는 서버기능 만들기
