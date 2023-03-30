import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import Map from "../../../components/utils/map";
import { IPlace } from "../../../types/studyDetails";

function StudySpaceOverView({ space }: { space: IPlace }) {
  const location = locationArr?.find((info) => info.name === space.brand);
  const [isModal, setIsModal] = useState(false);

  const onClickMap = () => {
    setIsModal(true);
    console.log(22);
  };
  return (
    <>
      <Layout>
        <span>
          {space?.brand} {space?.branch}점
        </span>
        <SpaceDetail>
          <Location>
            위치: <span>{location?.location}</span>
            <div onClick={onClickMap}>
              <FontAwesomeIcon icon={faLocationDot} size="sm" />
              <span>지도</span>
            </div>
          </Location>

          <Time>
            시간: <span>{location?.time}</span>
          </Time>
        </SpaceDetail>
      </Layout>
      {isModal && (
        <div>
          <span>안녕하세요</span>
          <Map />
          22444
        </div>
      )}
    </>
  );
}

const Layout = styled.div`
  margin-top: 36px;
  padding-bottom: 18px;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
  > div:first-child {
    margin-left: 20px;
    background-color: red;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h2);
  font-size: 12px;
  font-weight: 600;

  margin-top: 12px;
  display: flex;
  flex-direction: column;
  > span {
    > span {
      margin-left: 4px;
    }
  }
`;
const Location = styled.span`
  > span {
    color: var(--font-h1);
    margin-right: 12px;
  }
  > div {
    > span:last-child {
      margin-left: 2px;
    }
  }
`;
const Time = styled.span`
  > span {
    color: var(--font-h1);
  }
`;
export default StudySpaceOverView;

const locationArr = [
  {
    name: "카탈로그",
    location: "경기 수원시 팔달구 아주로 47번길 13",
    time: "12:00 - 22:00",
  },
  {
    name: "탐앤탐스",
    location: "경기 수원시 팔달구 매산로 1",
    time: "08:00 - 24:00",
  },
  {
    name: "아티제",
    location: "경기 수원시 영통구 센트럴타운로 85",
    time: "09:00 - 22:30",
  },
  {
    name: "커피빈",
    location: "경기 수원시 팔달구 권광로 195",
    time: "08:00 - 22:00",
  },
];
