"use client";

import { useState } from "react";

export default function Write() {
  const [src, setSrc] = useState("");
  return (
    <div className="Container">
      <div className="db box">
        <h4>글 작성하기</h4>
        <form
          action={`/api/post/new?image=${src}`}
          method="POST"
          className="db-form"
        >
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
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              let file = e.target.files[0];
              let fileName = encodeURIComponent(file.name); // 글자가 깨질 수  있으므로 안전하게 인코딩 하여 처리한다.
              let res = await fetch(`api/post/image?file=${fileName}`);
              res = await res.json();
              //S3 업로드

              const formData = new FormData();

              Object.entries({ ...res.fields, file }).forEach(
                ([key, value]) => {
                  formData.append(key, value);
                }
              );

              let result = await fetch(res.url, {
                method: "POST",
                body: formData,
              });
              console.log(result);

              if (result.ok) {
                setSrc(result.url + "/" + fileName);
              } else {
                console.log("실패");
              }
            }}
          />
          <img src={src} style={{ width: 300, height: 300 }} />
          <button type="submit">생성</button>
        </form>
      </div>
    </div>
  );
}
