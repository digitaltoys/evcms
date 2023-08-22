import {
  faChargingStation,
  faCircleQuestion,
  faClock,
  faMagnifyingGlass,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidemenu = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div>
      <nav className="h-full w-60">
        <ul className="h-full">
          <li>
            <Link
              className={`flex items-center gap-4 p-4 text-xl hover:bg-gray-100 ${
                router.pathname === "/" && "border-r-8 border-green-400"
              }`}
              href="/"
            >
              <span className="w-8 h-8">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  width={32}
                  height={32}
                />
              </span>
              <span>충전소 검색</span>
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 p-4 text-xl hover:bg-gray-100 ${
                router.pathname === "/members" && "border-r-8 border-green-400"
              }`}
              href="/members"
            >
              <span className="w-8 h-8">
                <FontAwesomeIcon icon={faUsers} width={32} height={32} />
              </span>
              <span>회원 관리</span>
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 p-4 text-xl hover:bg-gray-100 ${
                router.pathname === "/charging-stations" &&
                "border-r-8 border-green-400"
              }`}
              href="/charging-stations"
            >
              <span className="w-8 h-8">
                <FontAwesomeIcon
                  icon={faChargingStation}
                  width={32}
                  height={32}
                />
              </span>
              <span>충전소 관제</span>
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 p-4 text-xl hover:bg-gray-100 ${
                router.pathname === "/charging-history" &&
                "border-r-8 border-green-400"
              }`}
              href="/charging-history"
            >
              <span className="w-8 h-8">
                <FontAwesomeIcon icon={faClock} width={32} height={32} />
              </span>
              <span>충전 이력 조회</span>
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 p-4 text-xl hover:bg-gray-100 ${
                router.pathname === "/help" && "border-r-8 border-green-400"
              }`}
              href="/help"
            >
              <span className="w-8 h-8">
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  width={32}
                  height={32}
                />
              </span>
              <span>도움말</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidemenu;
