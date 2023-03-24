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
  }, [voteDate]);
  return (
    <>
      {loading ? (
        <Loader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
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
