import { Switch } from "@chakra-ui/react";
import {
  faLocationCrosshairs,
  faUser,
  faUserGroup,
  faVenusMars,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useErrorToast } from "../../../hooks/custom/CustomToast";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GatherWritingConditionAgeRange from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionAgeRange";
import GatherWritingConditionCnt from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionCnt";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";

import { PopOverIcon } from "../../../components/common/Icon/PopOverIcon";

import { faPersonToDoor } from "@fortawesome/pro-regular-svg-icons";
import GroupStudyConfirmModal from "../../../modals/groupStudy/WritingConfirmModal";
import GatherWritingConditionLocation from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionLocation";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";
import { IGatherMemberCnt } from "../../../types/page/gather";
import { IGroupStudyWriting } from "../../../types/page/groupStudy";
import { Location } from "../../../types/system";

type ButtonType = "gender" | "age" | "pre" | "location" | "manager";

export type CombinedLocation = "전체" | "수원/안양" | "양천/강남";

function WritingCondition() {
  const errorToast = useErrorToast();

  const [groupStudyWriting, setGroupStudyWriting] = useRecoilState(
    sharedGroupStudyWritingState
  );

  const { data: userInfo } = useUserInfoQuery();

  const [condition, setCondition] = useState({
    gender: groupStudyWriting?.gender || false,
    age: groupStudyWriting?.age ? true : false,
    location: true,
    manager: true,
  });

  const [memberCnt, setMemberCnt] = useState<IGatherMemberCnt>({
    min: 4,
    max: 0,
  });

  const [age, setAge] = useState(groupStudyWriting?.age || [19, 28]);

  const [location, setLocation] = useState<Location | CombinedLocation>(
    userInfo?.location
  );
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const onClickNext = async () => {
    const groupStudyData: IGroupStudyWriting = {
      ...groupStudyWriting,
      location,
      age,
      memberCnt,
      gender: condition.gender,
      organizer: userInfo,
    };
    setGroupStudyWriting(groupStudyData);
    setIsConfirmModal(true);
  };

  const toggleSwitch = (e: ChangeEvent<HTMLInputElement>, type: ButtonType) => {
    const isChecked = e.target.checked;
    if (type === "location" && isChecked) {
      setLocation(userInfo.location);
    }
    setCondition((old) => {
      return { ...old, [type]: isChecked };
    });
  };

  return (
    <>
      <PageLayout>
        <ProgressStatus value={100} />
        <Header title="" url="/gather/writing/location" />
        <RegisterLayout>
          <RegisterOverview>
            <span>조건을 선택해 주세요.</span>
          </RegisterOverview>
          <Container>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>최소 인원</span>
              </Name>
              <GatherWritingConditionCnt
                isMin={true}
                value={memberCnt.min}
                setMemberCnt={setMemberCnt}
              />
            </Item>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>최대 인원</span>
              </Name>
              <GatherWritingConditionCnt
                isMin={false}
                value={memberCnt.max}
                setMemberCnt={setMemberCnt}
              />
            </Item>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faVenusMars} />
                <span>성별 고려</span>
                <PopOverIcon
                  title="성별 고려"
                  text="성별 비율을 최대 2대1까지 제한합니다. 공부 스터디의 경우에는 설정이 불가능합니다."
                />
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.gender}
                onChange={(e) => toggleSwitch(e, "gender")}
              />
            </Item>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faUser} />
                <span>나이(만)</span>
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.age}
                onChange={(e) => toggleSwitch(e, "age")}
              />
            </Item>
            {condition.age && (
              <GatherWritingConditionAgeRange age={age} setAge={setAge} />
            )}
            <Item>
              <Name>
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <span>지역 필터</span>
                <PopOverIcon
                  title="지역 필터"
                  text="기본으로는 본인이 속한 지역으로 한정합니다."
                />
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.location}
                onChange={(e) => toggleSwitch(e, "location")}
              />
            </Item>
            {!condition.location && (
              <GatherWritingConditionLocation setLocation={setLocation} />
            )}
            <Item>
              <Name>
                <FontAwesomeIcon icon={faPersonToDoor} />
                <span>자유 가입</span>
                <PopOverIcon
                  title="자유 가입"
                  text="조건에 맞는다면 자유롭게 가입이 가능합니다."
                />
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.location}
                onChange={(e) => toggleSwitch(e, "location")}
              />
            </Item>
          </Container>
          <BottomNav onClick={() => onClickNext()} text="완료" />
        </RegisterLayout>
      </PageLayout>
      {isConfirmModal && (
        <GroupStudyConfirmModal
          setIsModal={setIsConfirmModal}
          groupStudyWriting={groupStudyWriting}
        />
      )}
    </>
  );
}

const Name = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: var(--margin-md);
  }
`;

const Container = styled.div`
  font-size: 14px;
  margin-top: var(--margin-max);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--padding-main) 0;
  align-items: center;
  border-bottom: var(--border-sub);
`;

const PopOverWrapper = styled.span`
  padding: 2px;
`;

export default WritingCondition;
