import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../../components/layouts/Header";

function GatherHeader() {
  const router = useRouter();
  return (
    <Header title="모임">
      <Review onClick={() => router.push(`/review`)}>
        <span>모임 후기</span>
        <FontAwesomeIcon icon={faRightLong} />
      </Review>
    </Header>
  );
}

const Review = styled.span`
  font-weight: 600;
  font-size: 12px;
  > span:first-child {
    margin-right: 6px;
  }
`;

export default GatherHeader;
