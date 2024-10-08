import localFont from "next/font/local";
import "./globals.css";
import { Ubuntu_Mono } from "next/font/google";
import Link from "next/link";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const ubuntu_mono = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu_mono.className}>
        <div className="bg-neutral-800 p-2 w-full flex justify-between">
          <Link href={"/"} className="text-3xl rounded-lg p-1">
            Note Taking App
          </Link>
          <Link
            href={"/login"}
            className="bg-blue-500 text-white hover:bg-blue-400 p-1 w-[8rem] flex flex-row items-center justify-center rounded-lg text-2xl"
          >
            Login
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
