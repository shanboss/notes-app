import React from "react";
import Link from "next/link";

export default function Button({ label, link }) {
  return (
    <Link
      href={`/${link}`}
      className="bg-blue-500 duration-100 p-2 hover:bg-blue-400 rounded-lg text-lg"
    >
      {label}
    </Link>
  );
}
