import { useEffect, useState } from "react";
import Router from "next/router";
import Modals from "./Modals";
import { getSession, useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

import { GetServerSideProps } from "next";
import dbConnect from "../libs/dbConnect";
import { User } from "../models/user";
export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

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
