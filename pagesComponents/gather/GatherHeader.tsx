import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../../components/layouts/Header";

function GatherHeader() {
  const router = useRouter();
  return <Header title="모임"></Header>;
}

const Review = styled.span`
  font-weight: 600;
  font-size: 12px;
  > span:first-child {
    margin-right: 6px;
  }
`;

export default GatherHeader;
