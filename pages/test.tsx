import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import styled from "styled-components";
import { useCounterMutation } from "../hooks/sub/counter/mutations";
import { useCounterQuery } from "../hooks/sub/counter/queries";

function Test() {
  const C = useRef();
  const AA = () => <button>23</button>;

  const { mutate, data: data2 } = useCounterMutation(
    "enthusiasticMember",
    "양천",
    {
      onSuccess(data) {
        console.log(2, data);
        console.log("SUC");
      },
    }
  );
  console.log(55, data2);
  const { data } = useCounterQuery("enthusiasticMember", "수원");
  console.log(1, data);
  const onClick = () => {
    mutate();
  };

  return (
    <Layout>
      <Button onClick={onClick}>클릭하세요.</Button>
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
