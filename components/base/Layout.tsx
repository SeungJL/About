/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "../../components2/BottomNav";
import { useToken } from "../../hooks/custom/CustomHooks";
import BaseModal from "./BaseModal";
import BaseScript from "./BaseScript";
import Seo from "./Seo";

config.autoAddCss = false;
const PUBLIC_ROUTES = ["/login", "/register", "/checkingServer"];

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const router = useRouter();
  const pathname = usePathname();

  const segment = pathname.split("/")[1];
  console.log(5, segment, pathname, 2, "/".split("/"));

  const PUBLIC_SEGMENT = ["register"];

  const isPublicUrl = pathname;

  // const segments = pathname?.split("/").filter(Boolean);
  // const firstSegment = segments?.length ? segments[0] : null;

  const token = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { data: session } = useSession();

  const isGuest = session?.user.name === "guest";
  const [isErrorModal, setIsErrorModal] = useState(false);

  // const isPublicRoute = PUBLIC_ROUTES.some((route) =>
  //   router.asPath.startsWith(route)
  // );
  // const isCondition = !isPublicRoute && isGuest === false && Boolean(token);

  // const status = router.query?.status;
  console.log(2444, pathname);
  useEffect(() => {
    if (PUBLIC_SEGMENT.includes(segment)) return;
    if (session === null) router.push("/login");
    if (session?.user.role === "newUser") router.push("/register/location");
  }, [session]);

  // useUserInfoQuery({
  //   enabled:
  //     (!!session && isCondition && userInitialInfo === null) ||
  //     status === "login",
  //   onSuccess(data) {
  //     console.log(data);
  //     if (!isCondition || (userInitialInfo && status !== "login")) return;
  //     //유저 데이터 없음
  //     if (data === null || !data.registerDate || data.isActive === false) {
  //       if (router.query.status === "login") navigateTo(`/register/location`);
  //       else navigateTo("/login/?status=noMember");
  //       return;
  //     }
  //     //유저 데이터 에러
  //     if (session && data._id !== session.user.id) {
  //       setIsErrorModal(true);
  //       return;
  //     }
  //   },
  //   onError() {
  //     navigateTo("/checkingServer");
  //   },
  // });

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Seo title="ABOUT" />
      {token && (
        <>
          <div id="root-modal">{children}</div>
          {BASE_BOTTOM_NAV_URL.includes(pathname) && <BottomNav />}
          <BaseModal
            isGuest={isGuest}
            isError={isErrorModal}
            setIsError={setIsErrorModal}
          />
        </>
      )}
      <BaseScript />
    </>
  );
}

const BASE_BOTTOM_NAV_URL = ["/home", "/ranking", "/gather", "/group"];

export default Layout;
