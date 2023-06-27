import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function RankingCategory() {
  return (
    <Layout>
      <span>랭킹</span>
      <span>이름</span>
      <Popover>
        <PopoverTrigger>
          <FontAwesomeIcon icon={faExclamationCircle} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize="11px">랭킹 페이지</PopoverHeader>
          <PopoverBody fontSize="11px">
            해당 페이지는 현재 베타로 출시한 기능입니다. 디자인이나 기능이 아직
            완성되지 않은 점 감안해주세요!
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <FilterBtn>필터</FilterBtn>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  > span {
    font-weight: 600;
    width: 60px;
    text-align: center;
  }
  > span:first-child {
    margin-right: 12px;
  }
`;
const FilterBtn = styled.button`
  margin-left: auto;
  border: 1.5px solid var(--font-h5);
  padding: 0 12px;
  font-size: 12px;
`;
export default RankingCategory;
