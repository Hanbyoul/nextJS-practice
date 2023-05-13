import { connectDB } from "@components/app/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    if (req.body.name.trim() === "")
      return res.status(500).json("이름을 입력하세요!");
    if (req.body.email.trim() === "")
      return res.status(500).json("이메일을 입력하세요!");
    if (req.body.password.trim() === "")
      return res.status(500).json("비밀번호를 입력하세요!");

    const emailCheck = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (emailCheck) {
      return res.status(500).json("이미 사용중인 email 입니다.");
    }

    const hash = await bcrypt.hash(req.body.password, 10); // 10번 해쉬 처리한다.
    req.body.password = hash;
    req.body.role = "normal";
    console.log(req.body);
    //예외처리
    //1.유저가 입력한 정보에 공백 유무
    //2.이미 사용중인 email인지 중복 체크
    //3. 암호 설정시 유효성체크 (최소 글자수 , 특수문자 , 영문 조합 사용 등등. )
    // 리액트 훅 폼?? 사용해보기

    await db.collection("users").insertOne(req.body); //  새로운 collection 생성하여 내용 업데이트
    res.redirect("/");

    return res.end();
  }
}
