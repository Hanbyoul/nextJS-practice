import { connectDB } from "@components/app/util/database";

export default async function handler(req, res) {
  console.log(req.query);
  return res.json("응답");
}
