import { connectDB } from "@components/app/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "283977816eb51fb01a80",
      clientSecret: "f383413bcdd06c452217853ef36e7b338e0210f3",
    }),
  ],
  secret: "123qweasdzxc",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
