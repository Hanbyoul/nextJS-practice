import Link from "next/link";
import Buttons from "./Buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/pages/api/auth/[...nextauth]";

export default async function ListItem({ result }) {
  const answer = JSON.parse(result);
  const LoggedInUser = await getServerSession(authOptions);
  //로그인 유저(session)이메일과 작성한 유저 이메일이 같을 경우 수정,삭제 버튼 보이게하기.
  //문제사항 1. client component이기 때문에 session 정보를 get 할 수 없다.
  //버튼만 client component화 시켜서 여기 페이지는 ssr 로 만들어서 진행하기?

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
          {item.auth === LoggedInUser?.user.email ||
          LoggedInUser?.user.role === "admin" ? (
            <div>
              <Buttons id={item._id} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
