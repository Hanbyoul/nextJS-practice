export default function Write() {
  return (
    <div className="Container">
      <div className="db box">
        <h4>DB DATA</h4>
        <form action="/api/db" method="GET">
          <button>조회</button>
        </form>
      </div>
      <div className="time box">
        <h4>현재 시간</h4>
        <form action="/api/time" method="GET">
          <button>조회</button>
        </form>
      </div>
    </div>
  );
}
