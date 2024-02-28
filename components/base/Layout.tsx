/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "../../components2/BottomNav";
import { useToken } from "../../hooks/custom/CustomHooks";
import GuestBottomNav from "../layout/atoms/GuestBottomNav";
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
  const token = useToken();

  const segment = pathname?.split("/")?.[1];
  const PUBLIC_SEGMENT = ["register", "login"];
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [isErrorModal, setIsErrorModal] = useState(false);

  useEffect(() => {
    if (PUBLIC_SEGMENT.includes(segment)) return;
    if (session === null) router.push("/login");
    const role = session?.user.role;
    if (role === "newUser") router.push("/register/location");
    if (role === "waiting") router.push("/login?status=waiting");
  }, [session]);
  console.log(2, session);
  return (
    <>
      <Seo title="ABOUT" />

      {token && (
        <>
          <div id="root-modal">{children}</div>
          {BASE_BOTTOM_NAV_URL.includes(pathname) && <BottomNav />}
          {isGuest && BASE_BOTTOM_NAV_URL.includes(pathname) && (
            <GuestBottomNav />
          )}
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

const BASE_BOTTOM_NAV_URL = ["/home", "/statistics", "/gather", "/group"];

export default Layout;
