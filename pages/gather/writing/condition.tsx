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
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ModalPortal from "../../../components/modals/ModalPortal";
import SuccessScreen from "../../../components/pages/SuccessScreen";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { randomPassword } from "../../../helpers/validHelpers";
import { useErrorToast } from "../../../hooks/CustomToast";
import { useGatherContentMutation } from "../../../hooks/gather/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GatherWritingConditionAgeRange from "../../../pagesComponents/gather/writing/GatherWritingConditionAgeRange";
import GatherWritingConditionCnt from "../../../pagesComponents/gather/writing/GatherWritingConditionCnt";
import GatherWritingConditionPre from "../../../pagesComponents/gather/writing/GatherWritingConditionPre";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";

import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { GatherMemberCnt, IGatherWriting } from "../../../types/page/gather";

function WritingCondition() {
  const errorToast = useErrorToast();

  const gatherContent = useRecoilValue(sharedGatherWritingState);

  const [condition, setCondition] = useState({
    gender: gatherContent?.genderCondition || false,
    age: gatherContent?.age ? true : false,
    pre: gatherContent?.preCnt ? true : false,
    location: true,
  });

  const [memberCnt, setMemberCnt] = useState<GatherMemberCnt>({
    min: 4,
    max: 4,
  });
  const [preCnt, setPreCnt] = useState(gatherContent?.preCnt || 1);
  const [age, setAge] = useState(gatherContent?.age || [19, 28]);
  const [password, setPassword] = useState(gatherContent?.password);

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);

  const { data: userInfo } = useUserInfoQuery();

  const { mutate } = useGatherContentMutation({
    onSuccess() {
      setIsSuccessScreen(true);
    },
    onError: errorToast,
  });

  const onClickNext = async () => {
    const gatherData: IGatherWriting = {
      ...gatherContent,
      age,
      preCnt,
      memberCnt,
      genderCondition: condition.gender,
      password,
      user: userInfo,
      place: condition.location ? userInfo.location : "전체",
    };
    mutate(gatherData);
  };

  useEffect(() => {
    if (!password) setPassword(randomPassword());
  }, [password]);

  const toggleSwitch = (
    e: ChangeEvent<HTMLInputElement>,
    type: "gender" | "age" | "pre" | "location"
  ) => {
    const isChecked = e.target.checked;

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
                <GenderPopOver />
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
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.location}
                onChange={(e) => toggleSwitch(e, "location")}
              />
            </Item>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faUserSecret} />
                <span>사전 섭외</span>
                <PopOverIcon />
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
          </Container>
          <BottomNav onClick={() => onClickNext()} text="완료" />
        </RegisterLayout>
      </PageLayout>
      {!isSuccessScreen && (
        <ModalPortal setIsModal={setIsSuccessScreen}>
          <SuccessScreen url={`/gather`}>
            <>
              <span>모임 개최 성공</span>
              <div>모임 게시글을 오픈 채팅방에 공유해 주세요!</div>
            </>
          </SuccessScreen>
        </ModalPortal>
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
        <FontAwesomeIcon icon={faQuestionCircle} color="var(--font-h3)" />
      </PopOverWrapper>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontSize="11px">네비게이션 기능</PopoverHeader>
      <PopoverBody fontSize="11px">
        성별 비율을 최대 2대1까지 제한합니다.
      </PopoverBody>
    </PopoverContent>
  </Popover>
);
const PopOverIcon = () => (
  <Popover>
    <PopoverTrigger>
      <PopOverWrapper>
        <FontAwesomeIcon icon={faQuestionCircle} color="var(--font-h3)" />
      </PopOverWrapper>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontSize="11px">사전 섭외</PopoverHeader>
      <PopoverBody fontSize="11px">
        모집 인원에서 사전 섭외 인원 자리가 먼저 고정됩니다. 필요하다면 암호키를
        복사해서 전달해주세요!
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

const PopOverWrapper = styled.span`
  padding: 2px;
`;

export default WritingCondition;
