export default function Write() {
  return (
    <div className="Container">
      <div className="db box">
        <h4>DB DATA</h4>
        <form action="/api/post/new" method="POST" className="db-form">
          title
          <input name="title" type="text" placeholder="제목" />
          content
          <input name="content" type="text" placeholder="내용" />
          <button type="submit">생성</button>
        </form>
      </div>
    </div>
  );
}
