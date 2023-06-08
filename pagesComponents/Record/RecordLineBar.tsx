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
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/design";
import { Location } from "../../types/system";

function RecordLineBar({
  category,
  setCategory,
}: {
  category: Location;
  setCategory: Dispatch<SetStateAction<Location>>;
}) {
  const onClickBadge = (value: Location) => {
    if (value === category) setCategory("all");
    else setCategory(value);
  };

  return (
    <Layout>
      <SpaceBadge>
        <Button
          category={category}
          isSelected={category === "수원"}
          onClick={() => onClickBadge("수원")}
        >
          수원
        </Button>
        <Button
          category={category}
          isSelected={category === "양천"}
          onClick={() => onClickBadge("양천")}
        >
          양천구
        </Button>
      </SpaceBadge>{" "}
      <div>
        <Popover>
          <PopoverTrigger>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              color="var(--font-h2)"
              size="sm"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontSize="11px">랭킹 페이지</PopoverHeader>
            <PopoverBody fontSize="11px">
              해당 페이지는 현재 베타로 출시한 기능입니다. 디자인이나 기능이
              아직 완성되지 않은 점 감안해주세요! 지역 별 필터도 아직 기능하지
              않습니다.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 14px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--font-h7);
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
  > div {
    display: flex;
    align-items: center;
  }
`;

const SpaceBadge = styled.section`
  display: flex;
  align-items: center;
  > button {
    margin-right: 12px;
    font-weight: 600;
  }
  > button:first-child {
    color: ${VOTE_TABLE_COLOR[0]};
  }
  > button:nth-child(2) {
    color: ${VOTE_TABLE_COLOR[3]};
  }
`;

const Button = styled.button<{ category: Location; isSelected: boolean }>`
  font-size: ${(props) => (props.isSelected ? "14px" : "12px")};
  opacity: ${(props) =>
    props.category !== "all" && !props.isSelected ? "0.7" : "1"};
`;

const FilterBtn = styled.button`
  margin-left: auto;

  height: 24px;
  font-weight: 600;
  padding: 0 6px;
  font-size: 12px;
`;

export default RecordLineBar;
