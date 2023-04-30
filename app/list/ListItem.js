"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  const answer = JSON.parse(result);

  return (
    <div>
      {answer.map((item) => (
        <div className="list-item" key={item._id.toString()}>
          <div>
            <Link href={`/detail/${item._id.toString()}`}>
              <h4>{item.title}</h4>
            </Link>
            <p>4월 30일</p>
          </div>
          <div>
            <Link href={`/edit/${item._id}`} className="edit">
              📝
            </Link>
            <span
              className="remove"
              onClick={(e) => {
                // fetch(`/api/post/remove/`, {
                //   method: "DELETE",
                //   body: item._id,
                // })
                //   .then((r) => {
                //     return r.json();
                //   })
                //   .then(() => {
                //     e.target.parentElement.parentElement.style.opacity = 0;
                //     setTimeout(() => {
                //       e.target.parentElement.parentElement.style.display =
                //         "none";
                //     }, 700);
                //   });
                fetch("/api/test?name=hanbyoul&age=22");
              }}
            >
              🗑️
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
