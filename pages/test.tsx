import { Badge, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import styled from "styled-components";
import { useAdminStudyRecordQuery } from "../hooks/admin/quries";

import { useUserInfoQuery } from "../hooks/user/queries";

function Test() {
  const { data: session } = useSession();
  const { data: userInfo } = useUserInfoQuery();
  const C = useRef();
  const AA = () => <button>23</button>;

  const { data } = useAdminStudyRecordQuery(
    dayjs("2023-12-01"),
    dayjs("2023-12-04"),
    true,
    "안양"
  );
  const { data: data2 } = useAdminStudyRecordQuery(
    dayjs("2023-12-01"),
    dayjs("2023-12-04"),
    null,
    "안양"
  );
  console.log(4, data, data2);
  const onClick = () => {};

  return (
    <Layout>
      <Badge colorScheme="red">테스트</Badge>
      <Button onClick={onClick}>23</Button>
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
  > span:nth-child(5) {
    font-weight: 700;
  }
  > span:last-child {
    font-weight: 800;
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
