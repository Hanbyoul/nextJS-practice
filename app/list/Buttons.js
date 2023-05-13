"use client";
import Link from "next/link";

export default function Buttons({ id }) {
  return (
    <div>
      <Link href={`/edit/${id}`} className="edit">
        📝
      </Link>
      <span
        className="remove"
        onClick={(e) => {
          fetch(`/api/post/remove/`, {
            method: "DELETE",
            body: id,
          })
            .then((r) => {
              return r.json();
            })
            .then(() => {
              e.target.closest(".list-item").style.opacity = 0;
              setTimeout(() => {
                e.target.closest(".list-item").style.display = "none";
              }, 700);
            });
        }}
      >
        🗑️
      </span>
    </div>
  );
}
