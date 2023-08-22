import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";

import { isLoginAtom, loginUserDataAtom } from "../../atoms/atom";

const Login = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const [loginUserData, setLoginUserData] = useAtom(loginUserDataAtom);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickVisibleButton = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmitForm = () => {
    console.log("email", email);
    console.log("password", password);
    setIsLogin(true);
    router.push("/");
  };
  return (
    <div className="h-full flex justify-center items-center bg-gray-100">
      <div className="w-96 h-[36rem] bg-white border-gray-200 border-[1px] border-solid rounded-lg">
        <div className="flex justify-center items-center my-12 w-40 h-40 m-auto">
          <Image
            src="/ocube_logo_vertical.png"
            alt="ocube_logo"
            width={160}
            height={160}
          />
        </div>
        <div className="px-8 pb-4">
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitForm();
            }}
          >
            <div className="flex flex-col mb-4">
              <label
                className="mb-2 text-sm font-bold text-gray-400"
                htmlFor="email"
              >
                이메일
              </label>
              <div>
                <input
                  className="w-full h-12 px-4 border-[1px] border-solid rounded-md"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <label
                className="mb-2 text-sm font-bold text-gray-400"
                htmlFor="password"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 pl-4 pr-10 border-[1px] border-solid rounded-md"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={handleChangePassword}
                />

                <button
                  className="absolute right-2 top-3 w-6 h-6 text-gray-400"
                  type="button"
                  onClick={handleClickVisibleButton}
                >
                  {isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              </div>
            </div>
            <div>
              <button
                className="w-full h-12 bg-green-400 text-lg font-bold text-white rounded-md transition-all ease-in-out duration-200 hover:bg-green-500"
                type="submit"
                aria-label="submit_button"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center px-8">
          <Link className="text-sm text-gray-500" href="/">
            아이디 찾기
          </Link>
          <div className="inline w-[1px] h-4 mx-4 bg-gray-300" />
          <Link className="text-sm text-gray-500" href="/">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
