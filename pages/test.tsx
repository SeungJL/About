import { useSession } from "next-auth/react";
import { useRef } from "react";
import styled from "styled-components";
import { useUserInfoQuery } from "../hooks/user/queries";
import { useCollectionAlphabetMutation } from "../hooks/user/sub/collection/mutations";

function Test() {
  const { data: session } = useSession();
  const { data: userInfo } = useUserInfoQuery();
  const C = useRef();
  const AA = () => <button>23</button>;
  const { mutate: getAlphabet } = useCollectionAlphabetMutation("get");
  const { mutate, data } = useCollectionAlphabetMutation("change");
  const onClick = () => {};
  console.log(data);

  return (
    <Layout>
      <span>안녕하세요</span>
      <span>안녕하세요</span>
      <span>안녕하세요</span>
      <span>안녕하세요</span>
      <span>안녕하세요</span>
      <span>안녕하세요</span>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  > * {
    margin-right: 20px;
  }
  display: flex;
  > span:first-child {
    font-weight: 300;
  }
  > span:nth-child(2) {
    font-weight: 400;
  }
  > span:nth-child(3) {
    font-weight: 500;
  }
  > span:nth-child(4) {
    font-weight: 600;
  }
  > span:last-child {
    font-weight: 700;
  }
`;

const A = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(3, 224, 154, 1),
    rgba(1, 175, 237, 1)
  );
`;
const B = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(3, 224, 154, 0.6),
    rgba(1, 175, 237, 0.6)
  );
`;

const D = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(3, 224, 154, 0.35),
    rgba(1, 175, 237, 0.35)
  );
`;

export default Test;
