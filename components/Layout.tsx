import { useEffect, useState } from "react";
import Router from "next/router";
import Modals from "./Modals";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { isShowRegisterFormState } from "../recoil/atoms";
export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const setIsShowRegisterForm = useSetRecoilState(isShowRegisterFormState);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <div id="root-modal">{children}</div>
      <Modals />
    </>
  );
}
