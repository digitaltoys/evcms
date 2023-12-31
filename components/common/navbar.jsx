import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom, useAtomValue } from "jotai";

import { isLoginAtom, loginUserDataAtom } from "../../atoms/atom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const loginUserData = useAtomValue(loginUserDataAtom);

  const router = useRouter();

  function isActive(path) {
    return router.pathname === path ? true : false;
  }

  function handleClickLogout() {
    setIsLogin(false);
    router.push("/login");
  }

  return (
    <nav className="flex justify-between items-center  w-full h-16 bg-white shadow-md">
      <div className="flex items-center gap-4 px-4">
        <span className="w-12 h-12">
          <Image
            src="/ocube_logo_vertical.png"
            alt="company_logo"
            width={48}
            height={48}
          />
        </span>
        <span className="text-2xl font-bold">EVCMS</span>
      </div>
      <div className="flex items-center gap-4 px-4">
        {/* <Link className={`px-4`} href="/">
          <span className={`${isActive("/") && "text-green-500"}`}>
            충전소 조회
          </span>
        </Link>
        <Link className={`px-4`} href="/user/uselist">
          <span className={`${isActive("/user/uselist") && "text-green-500"}`}>
            이용내역
          </span>
        </Link> */}

        {isLogin ? (
          <>
            <div>
              <span className="text-sm font-bold">
                {loginUserData.nick_name}
              </span>
            </div>
            <button
              className="py-2 px-4 text-sm font-bold border-[1px]"
              onClick={handleClickLogout}
            >
              <span>로그아웃</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="py-2 px-4 text-sm font-bold border-[1px]"
          >
            <span>로그인</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
