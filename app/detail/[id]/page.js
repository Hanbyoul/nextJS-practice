import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";

export default async function DetailLink({ params }) {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <div>
      <h1>Detail</h1>
      <h2>제목 : {result.title}</h2>
      <p>내용 : {result.content}</p>
    </div>
  );
}
