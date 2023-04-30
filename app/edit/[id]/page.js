import { connectDB } from "@components/app/util/database";
import { ObjectId } from "mongodb";

export default async function EditLink({ params }) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <div className="Container">
      <div className="db box">
        <h4>수정 페이지</h4>
        <form
          action={`/api/post/edit/${params.id}`}
          method="POST"
          className="db-form"
        >
          title
          <input
            name="title"
            type="text"
            placeholder="제목"
            defaultValue={result.title}
          />
          content
          <input
            name="content"
            type="text"
            placeholder="내용"
            defaultValue={result.content}
          />
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
}
