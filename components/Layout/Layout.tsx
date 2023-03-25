import { useEffect, useState } from "react";
import Router from "next/router";
import Modals from "../Modals";
import { getSession, useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GetServerSideProps } from "next";
import dbConnect from "../../libs/dbConnect";
import { User } from "../../models/user";

import { Audio, ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { voteDateState } from "../../recoil/atoms";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
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
      {loading ? (
        <Loader>
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ff6b6b", "#fd7b5b", "#ffa500", "#ffeae5", "#00c2b3"]}
          />
        </Loader>
      ) : (
        <>
          <div id="root-modal">{children}</div>
          <Modals />
        </>
      )}
    </>
  );
}

const Loader = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
