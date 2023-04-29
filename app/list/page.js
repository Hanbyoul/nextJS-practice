import Link from "next/link";
import { connectDB } from "../util/database";
import DetailLink from "./DetailLink";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").find().toArray();

  console.log(result);

  return (
    <div className="list-bg">
      {result.map((item, i) => (
        <div className="list-item" key={i}>
          <Link href={`/detail/${item._id.toString()}`}>
            <h4>{item.title}</h4>
          </Link>
          <DetailLink />
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
