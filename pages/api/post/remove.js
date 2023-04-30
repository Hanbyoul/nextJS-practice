import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log(req.body);
  const id = req.body;
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(id) });

  console.log(result);
  return res.status(200).json("완료");
}
