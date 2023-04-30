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
      <h1>상세페이지</h1>
      <h2>{result.title}</h2>
      <p>{result.content}</p>
    </div>
  );
}
