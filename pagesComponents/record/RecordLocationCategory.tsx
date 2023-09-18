import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/system";
import { SPACE_LOCATION } from "../../storage/study";
import { IArrivedData } from "../../types/study/studyRecord";
import { Location } from "../../types/system";

interface IRecordLocationCategory {
  setOpenData: React.Dispatch<SetStateAction<IArrivedData[]>>;
  arrivedData: IArrivedData[];
}

function RecordLocationCategory({
  setOpenData,
  arrivedData,
}: IRecordLocationCategory) {
  const [category, setCategory] = useState<Location>("전체");

  const onClickBadge = (value: Location) => {
    if (value === category) setCategory("전체");
    else setCategory(value);
  };

  useEffect(() => {
    if (!arrivedData) return;
    if (category !== "전체")
      setOpenData(
        arrivedData.map((item) => {
          return {
            ...item,
            arrivedInfoList: item.arrivedInfoList.filter(
              (place) => SPACE_LOCATION[place?.placeId] === category
            ),
          };
        })
      );
    else setOpenData(arrivedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivedData, category]);

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
        <Button
          category={category}
          isSelected={category === "안양"}
          onClick={() => onClickBadge("안양")}
        >
          안양
        </Button>
        <Button
          category={category}
          isSelected={category === "강남"}
          onClick={() => onClickBadge("강남")}
        >
          강남
        </Button>
      </SpaceBadge>
      <span>Free 오픈 제외</span>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 var(--padding-main);
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
  > span:last-child {
    font-size: 10px;
    color: var(--font-h3);
  }
`;

const SpaceBadge = styled.section`
  display: flex;
  align-items: center;
  > button {
    margin-right: var(--margin-sub);
    font-weight: 600;
  }
  > button:first-child {
    color: ${VOTE_TABLE_COLOR[0]};
  }
  > button:nth-child(2) {
    color: ${VOTE_TABLE_COLOR[3]};
  }
  > button:nth-child(3) {
    color: ${VOTE_TABLE_COLOR[2]};
  }
  > button:nth-child(4) {
    color: ${VOTE_TABLE_COLOR[1]};
  }
`;

const Button = styled.button<{ category: Location; isSelected: boolean }>`
  font-size: ${(props) => (props.isSelected ? "14px" : "12px")};
  opacity: ${(props) =>
    props.category !== "전체" && !props.isSelected ? "0.7" : "1"};
`;

export default RecordLocationCategory;
