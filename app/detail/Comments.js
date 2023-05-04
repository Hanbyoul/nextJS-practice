"use client";

import { useEffect, useState } from "react";

export default function Comments({ params }) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${params}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="comments">
      <h2>댓글</h2>
      <div className="comment-submit">
        <input
          value={comment}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        <button
          onClick={() => {
            fetch(`/api/comments/${params}`, {
              method: "POST",
              body: comment,
            })
              .then((res) => res.json())
              .then((res) => setData(res))
              .then(setComment(""));
          }}
        >
          댓글전송
        </button>
      </div>
      <hr />
      {data?.map((comment, index) => (
        <div className="comment-user" key={index}>
          <div className="comment-name">{comment.author}</div>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  );
}
