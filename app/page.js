import { MongoClient } from "mongodb";
import { connectDB } from "./util/database";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").find().toArray();
  console.log(result);

  return (
    <div>
      <h1>안녕</h1>
    </div>
  );
}
