import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
} from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import {
  faLocationCrosshairs,
  faUser,
  faUserGroup,
  faUserSecret,
  faVenusMars,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { randomPassword } from "../../../helpers/validHelpers";
import { useErrorToast } from "../../../hooks/CustomToast";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GatherWritingConditionAgeRange from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionAgeRange";
import GatherWritingConditionCnt from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionCnt";
import GatherWritingConditionPre from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionPre";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";

import { faUserPolice } from "@fortawesome/pro-solid-svg-icons";
import { PopOverIcon } from "../../../components/common/Icon/PopOverIcon2";
import GatherWritingConfirmModal from "../../../modals/gather/GatherWritingConfirmModal";

import GatherWritingConditionLocation from "../../../pagesComponents/gather/writing/condition/GatherWritingConditionLocation";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { GatherMemberCnt, IGatherWriting } from "../../../types/page/gather";
import { Location } from "../../../types/system";

type ButtonType = "gender" | "age" | "pre" | "location" | "manager";

export type CombinedLocation = "전체" | "수원/안양" | "양천/강남";

function WritingCondition() {
  const errorToast = useErrorToast();

  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherWritingState
  );

  const { data: userInfo } = useUserInfoQuery();

  const [condition, setCondition] = useState({
    gender: gatherContent?.genderCondition || false,
    age: gatherContent?.age ? true : false,
    pre: gatherContent?.preCnt ? true : false,
    location: true,
    manager: true,
  });

  const [memberCnt, setMemberCnt] = useState<GatherMemberCnt>({
    min: 4,
    max: 4,
  });
  const [preCnt, setPreCnt] = useState(gatherContent?.preCnt || 1);
  const [age, setAge] = useState(gatherContent?.age || [19, 28]);
  const [password, setPassword] = useState(gatherContent?.password);
  const [location, setLocation] = useState<Location | CombinedLocation>(
    userInfo?.location
  );
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const isManager = ["manager", "previliged"].includes(userInfo?.role);

  const onClickNext = async () => {
    const gatherData: IGatherWriting = {
      ...gatherContent,
      age,
      preCnt,
      memberCnt,
      genderCondition: condition.gender,
      password,
      user: userInfo,
      place: location || userInfo?.location,
      isAdminOpen: !condition.manager,
    };
    setGatherContent(gatherData);
    setIsConfirmModal(true);
  };
  console.log(condition.manager);

  useEffect(() => {
    if (!password) setPassword(randomPassword());
  }, [password]);

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
        <Header title="" url="/gather/writing/date" />
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
                  text="성별 비율을 최대 2대1까지 제한합니다."
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
                <FontAwesomeIcon icon={faUserSecret} />
                <span>사전 섭외</span>
                <PopOverIcon
                  title="사전 섭외"
                  text=" 모집 인원에서 사전 섭외 인원 자리가 먼저 고정됩니다. 암호키를 복사해서 전달해주세요."
                />
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.pre}
                onChange={(e) => toggleSwitch(e, "pre")}
              />
            </Item>
            {condition.pre && (
              <GatherWritingConditionPre
                preCnt={preCnt}
                setPreCnt={setPreCnt}
                password={password}
                
              />
            )}
            {isManager && (
              <Item>
                <Name>
                  <FontAwesomeIcon icon={faUserPolice} />
                  <span>운영진 참여</span>
                  <PopOverIcon
                    title="운영진 기능"
                    text="운영진에게만 표시되는 기능입니다. 본인의 참여 여부를 선택할 수 있습니다."
                  />
                </Name>
                <Switch
                  mr="var(--margin-min)"
                  colorScheme="mintTheme"
                  isChecked={condition.manager}
                  onChange={(e) => toggleSwitch(e, "manager")}
                />
              </Item>
            )}
          </Container>
          <BottomNav onClick={() => onClickNext()} text="완료" />
        </RegisterLayout>
      </PageLayout>
      {isConfirmModal && (
        <GatherWritingConfirmModal
          setIsModal={setIsConfirmModal}
          gatherData={gatherContent}
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

const GenderPopOver = () => (
  <Popover>
    <PopoverTrigger>
      <PopOverWrapper>
        <FontAwesomeIcon icon={faQuestionCircle} color="var(--font-h2)" />
      </PopOverWrapper>
    </PopoverTrigger>
    <PopoverContent ml="var(--margin-md)">
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontSize="11px" fontWeight="600">
        네비게이션 기능
      </PopoverHeader>
      <PopoverBody fontSize="11px">
        성별 비율을 최대 2대1까지 제한합니다.
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

// const PopOverIcon = () => (
//   <Popover>
//     <PopoverTrigger>
//       <PopOverWrapper>
//         <FontAwesomeIcon icon={faQuestionCircle} color="var(--font-h3)" />
//       </PopOverWrapper>
//     </PopoverTrigger>
//     <PopoverContent>
//       <PopoverArrow />
//       <PopoverCloseButton />
//       <PopoverHeader fontSize="11px">사전 섭외</PopoverHeader>
//       <PopoverBody fontSize="11px">
//         모집 인원에서 사전 섭외 인원 자리가 먼저 고정됩니다. 필요하다면 암호키를
//         복사해서 전달해주세요!
//       </PopoverBody>
//     </PopoverContent>
//   </Popover>
// );

const PopOverWrapper = styled.span`
  padding: 2px;
`;

export default WritingCondition;
