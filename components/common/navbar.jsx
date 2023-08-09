import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  w-full h-16 bg-white shadow-md">
      <div className="flex items-center gap-4 p-4">
        <Image
          src="/ocube_logo_vertical.png"
          alt="company_logo"
          width={48}
          height={48}
        />
        <span className="text-2xl font-bold">EVEMS</span>
      </div>
      <div className="px-4">
        <Link
          href="/login"
          className="py-2 px-4 text-sm font-bold border-[1px]"
        >
          <span>로그인</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
