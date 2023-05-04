import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";
import Comments from "../\bComments";

export default async function DetailLink({ params }) {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <div className="detail">
      <h1>{result.title}</h1>
      <hr />
      <p>{result.content}</p>
      <Comments params={params.id} />
    </div>
  );
}
