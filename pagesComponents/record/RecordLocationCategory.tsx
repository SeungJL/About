import { useEffect, useState } from "react";
import styled from "styled-components";
import { LOCATION_CONVERT, LOCATION_OPEN } from "../../constants/location";
import { TABLE_COLORS } from "../../constants/styles";
import { SPACE_LOCATION } from "../../storage/study";
import { DispatchType } from "../../types/reactTypes";
import { IArrivedData } from "../../types/study/study";
import { Location, LocationFilterType } from "../../types/system";

interface IRecordLocationCategory {
  initialData: IArrivedData[];
  setFilterData: DispatchType<IArrivedData[]>;
}

function RecordLocationCategory({
  initialData,
  setFilterData,
}: IRecordLocationCategory) {
  const [category, setCategory] = useState<LocationFilterType>("전체");

  const onClickBadge = (value: Location) => {
    if (value === category) setCategory("전체");
    else setCategory(value);
  };

  useEffect(() => {
    if (!initialData) return;
    if (category === "전체") setFilterData(initialData);
    else {
      const filtered = initialData.flatMap((item) => {
        const filteredArrived = item.arrivedInfoList.filter(
          (place) => SPACE_LOCATION[place?.placeId] === category
        );
        if (filteredArrived.length)
          return [{ ...item, arrivedInfoList: filteredArrived }];
        return [];
      });
      setFilterData(filtered);
    }
  }, [category, initialData, setFilterData]);

  return (
    <Layout>
      <SpaceBadge>
        {LOCATION_OPEN.map((location) => (
          <Button
            key={location}
            category={category}
            isSelected={category === location}
            onClick={() => onClickBadge(location)}
          >
            {LOCATION_CONVERT[location]}
          </Button>
        ))}
      </SpaceBadge>
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
    color: ${TABLE_COLORS[0]};
  }
  > button:nth-child(2) {
    color: ${TABLE_COLORS[3]};
  }
  > button:nth-child(3) {
    color: ${TABLE_COLORS[2]};
  }
  > button:nth-child(4) {
    color: ${TABLE_COLORS[1]};
  }
`;

const Button = styled.button<{
  category: LocationFilterType;
  isSelected: boolean;
}>`
  font-size: ${(props) => (props.isSelected ? "14px" : "12px")};
  opacity: ${(props) =>
    props.category !== "전체" && !props.isSelected ? "0.7" : "1"};
`;

export default RecordLocationCategory;
