import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@components/pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const loggedIn = await getServerSession(authOptions);
  console.log(loggedIn ? "로그인됨" : "로그아웃됨");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/" className="logo">
            Home
          </Link>
          <Link href="/list">글목록</Link>
          {loggedIn ? (
            <>
              <Link href="/write">글쓰기</Link>
              <span>{loggedIn.user.name} </span>
              <LogoutBtn />
            </>
          ) : (
            <LoginBtn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
