import { faA, faB } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styled from "styled-components";
import { useUidsToUsersInfoQuery } from "../hooks/user/queries";

function Test() {
  const C = useRef();
  const AA = () => <button>23</button>;

  const temp: { uid: string; cnt: number }[] = [];

  const { data } = useUidsToUsersInfoQuery(["2542567004", "2259633694"]);
  console.log(data);
  return (
    <Layout>
      <A>
        <FontAwesomeIcon icon={faA} color="white" size="2x" />
      </A>
      <B>
        <FontAwesomeIcon icon={faB} color="white" size="2x" />
      </B>

      <D />
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
