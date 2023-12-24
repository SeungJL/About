import { Switch } from "@chakra-ui/react";
import {
  faDollarSign,
  faLocationCrosshairs,
  faUser,
  faUserGroup,
  faVenusMars,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
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
import QuestionBottomDrawer from "../../../pagesComponents/groupStudy/writing/QuestionBottomDrawer";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";
import { IGatherMemberCnt } from "../../../types/page/gather";
import { IGroupStudyWriting } from "../../../types/page/groupStudy";
import { Location, LocationFilterType } from "../../../types/system";

type ButtonType = "gender" | "age" | "pre" | "location" | "isFree" | "fee";

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
    isFree:
      groupStudyWriting?.isFree !== null ? groupStudyWriting?.isFree : true,
    location:
      groupStudyWriting?.location !== null
        ? groupStudyWriting?.location === userInfo.location
        : true,

    fee:
      groupStudyWriting?.fee !== null ? groupStudyWriting?.fee !== 200 : false,
  });

  const [memberCnt, setMemberCnt] = useState<IGatherMemberCnt>({
    min: groupStudyWriting?.memberCnt?.min || 4,
    max:
      groupStudyWriting?.memberCnt?.max === null
        ? 8
        : groupStudyWriting?.memberCnt.max,
  });

  const [age, setAge] = useState(groupStudyWriting?.age || [19, 28]);

  const [fee, setFee] = useState("1000");
  const [feeText, setFeeText] = useState(
    groupStudyWriting?.feeText || "기본 참여비"
  );

  const [question, setQuestion] = useState(
    groupStudyWriting?.questionText || ""
  );
  const [location, setLocation] = useState<
    Location | CombinedLocation | LocationFilterType
  >(groupStudyWriting?.location || userInfo?.location);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const [isQuestionModal, setIsQuestionModal] = useState(false);

  useEffect(() => {
    if (!condition.isFree) setIsQuestionModal(true);
    else setIsQuestionModal(false);
  }, [condition.isFree]);

  const onClickNext = async () => {
    const groupStudyData: IGroupStudyWriting = {
      ...groupStudyWriting,
      fee: condition.fee ? +fee : 0,
      feeText,
      isFree: condition.isFree,
      location,
      age,
      memberCnt,
      gender: condition.gender,
      organizer: userInfo,
      questionText: question,
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
        <Header title="" url="/groupStudy/writing/hashTag" />
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
                defaultBoolean={memberCnt.max === 0 ? true : false}
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
                disabled={
                  !["게임", "기타"].includes(groupStudyWriting?.category.main)
                }
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
                isChecked={condition.isFree}
                onChange={(e) => toggleSwitch(e, "isFree")}
              />
            </Item>
            <Item>
              <Name>
                <FontAwesomeIcon icon={faDollarSign} />
                <span>참여비</span>
                <PopOverIcon
                  title="참여비"
                  text="기본 참여비는 1000원이고, 특별한 사용처가 없더라도 운영을 위해 그룹장에게 지급됩니다. 그 외 추가적인 활동비가 필요한 경우에도 변경할 수 있고, 아예 참여비를 원하지 않는 경우 설정하지 않아도 됩니다."
                />
              </Name>
              <Switch
                mr="var(--margin-min)"
                colorScheme="mintTheme"
                isChecked={condition.fee}
                onChange={(e) => toggleSwitch(e, "fee")}
              />
            </Item>
            {condition.fee && (
              <Fee>
                <div>
                  <span>참여비: </span>
                  <input
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="2000"
                  />
                </div>

                <div>
                  <span>사용처: </span>
                  <input
                    value={feeText}
                    onChange={(e) => setFeeText(e.target.value)}
                    placeholder="출석에 대한 벌금"
                  />
                </div>
              </Fee>
            )}
          </Container>
          <BottomNav onClick={() => onClickNext()} text="완료" />
        </RegisterLayout>
      </PageLayout>

      <QuestionBottomDrawer
        isModal={isQuestionModal}
        setIsModal={setIsQuestionModal}
        question={question}
        setQuestion={setQuestion}
      />

      {isConfirmModal && (
        <GroupStudyConfirmModal
          setIsModal={setIsConfirmModal}
          groupStudyWriting={groupStudyWriting}
          setGroupStudyWriting={setGroupStudyWriting}
        />
      )}
    </>
  );
}

const Fee = styled.div`
  padding: var(--padding-sub) 0;
  > div {
    margin-bottom: var(--margin-sub);
    > input {
      width: 60px;
      padding: var(--padding-min) var(--padding-md);
      border-radius: var(--border-radius2);
      border: var(--border-main);
      :focus {
        outline-color: var(--font-h1);
      }
    }
  }
  > div:last-child {
    > input {
      width: 280px;
    }
  }
`;

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
