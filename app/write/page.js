export default function Write() {
  return (
    <div className="Container">
      <div className="db box">
        <h4>글 작성하기</h4>
        <form action="/api/post/new" method="POST" className="db-form">
          title
          <input
            name="title"
            type="text"
            placeholder="제목"
            required
            minLength={1}
          />
          content
          <input
            name="content"
            type="text"
            placeholder="내용"
            required
            minLength={1}
          />
          <button type="submit">생성</button>
        </form>
      </div>
    </div>
  );
}
