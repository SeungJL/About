import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faExclamationCircle,
  faMinus,
  faPlus,
  faUserGroup,
  faUserSecret,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CopyBtn } from "../../../components/common/Icon/CopyIcon";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import ProgressStatus from "../../../components/layouts/ProgressStatus";
import SuccessScreen from "../../../components/layouts/SuccessScreen";
import ModalPortal from "../../../components/ModalPortal";
import { useGatherContentMutation } from "../../../hooks/gather/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { randomPassword } from "../../../libs/utils/validUtils";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";

import { sharedGatherDataState } from "../../../recoil/sharedDataAtoms";

const AGE_BAR = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

function WritingCondition() {
  const toast = useToast();
  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherDataState
  );

  const [maxValue, setMaxValue] = useState(gatherContent?.memberCnt?.max || 4);
  const [minValue, setMinValue] = useState(gatherContent?.memberCnt?.min || 4);
  const [genderCondition, setGenderCondition] = useState(
    gatherContent?.genderCondition || false
  );
  const [ageCondition, setAgeCondition] = useState(
    gatherContent?.age ? true : false
  );
  const [isPreMember, setIsPreMember] = useState(
    gatherContent?.preCnt ? true : false
  );

  const [isMaxCondition, setIsMaxCondition] = useState(true);

  const [preCnt, setPreCnt] = useState(gatherContent?.preCnt || 1);

  const [age, setAge] = useState(gatherContent?.age || [19, 28]);

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);

  const { mutate } = useGatherContentMutation({
    onSuccess(data) {
      console.log("Suc");
    },
  });

  const { data } = useUserInfoQuery();

  const onClickNext = async () => {
    if (
      !isMaxCondition &&
      (minValue < 1 || maxValue < 1 || minValue > maxValue)
    ) {
      toast({
        title: "진행 불가",
        description: `인원을 확인해 주세요.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const gatherData = {
      ...gatherContent,
      age,
      preCnt,
      memberCnt: { min: minValue, max: isMaxCondition ? 0 : maxValue },
      genderCondition: genderCondition,
      password,
      user: data,
    };
    setGatherContent(gatherData);

    mutate(gatherData);
    setIsSuccessScreen(true);
  };
  const onChangeAge = (value) => {
    setAge(value);
  };

  const [password, setPassword] = useState(gatherContent?.password);

  useEffect(() => {
    if (isPreMember) setPassword(randomPassword());
  }, [isPreMember]);

  return (
    <>
      <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
        <ProgressStatus value={100} />
        <Header title="" url="/gather/writing/date" />
        <RegisterLayout>
          <RegisterOverview>
            <span>조건을 선택해 주세요.</span>
          </RegisterOverview>
          <Container>
            <Item>
              <div>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>최소 인원</span>
              </div>
              <MemberCnt>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => setMinValue((old) => old - 1)}
                />
                <span>{minValue}명</span>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => setMinValue((old) => old + 1)}
                />
              </MemberCnt>
            </Item>
            <Item>
              <div>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>최대 인원</span>
              </div>
              <MemberCnt>
                <Switch
                  colorScheme="mintTheme"
                  isChecked={isMaxCondition}
                  onChange={(e) => setIsMaxCondition(e.target.checked)}
                  mr="16px"
                />
                {isMaxCondition ? (
                  <MaxConditionText>제한없음</MaxConditionText>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => setMaxValue((old) => old - 1)}
                    />
                    <span>{maxValue}명</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => setMaxValue((old) => old + 1)}
                    />
                  </>
                )}
              </MemberCnt>
            </Item>
            <Item>
              <div>
                <FontAwesomeIcon icon={faVenusMars} />
                <span style={{ marginRight: "8px" }}>성별 고려</span>
                <Popover>
                  <PopoverTrigger>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      color="var(--font-h3)"
                      size="sm"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontSize="11px">
                      네비게이션 기능
                    </PopoverHeader>
                    <PopoverBody fontSize="11px">
                      성별 비율을 최대 2대1까지 제한합니다.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
              <Switch
                colorScheme="mintTheme"
                isChecked={genderCondition}
                onChange={(e) => setGenderCondition(e.target.checked)}
              />
            </Item>
            <SlideItem layout>
              <div>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span>나이(만)</span>
                </div>

                <Switch
                  colorScheme="mintTheme"
                  isChecked={ageCondition}
                  onChange={(e) => setAgeCondition(e.target.checked)}
                />
              </div>
              {ageCondition && (
                <SelectAge
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <RangeSlider
                    value={age}
                    min={20}
                    max={28}
                    step={1}
                    width="97%"
                    alignSelf="center"
                    onChange={onChangeAge}
                  >
                    <RangeSliderTrack bg="var(--font-h5)">
                      <RangeSliderFilledTrack bg="var(--color-mint)" />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0} />
                    <RangeSliderThumb boxSize={6} index={1} />
                  </RangeSlider>
                  <AgeText>
                    {AGE_BAR?.map((num) => (
                      <Age key={num}>{num}</Age>
                    ))}
                  </AgeText>
                </SelectAge>
              )}
            </SlideItem>
            <SlideItem layout>
              <div>
                <div>
                  <FontAwesomeIcon icon={faUserSecret} />
                  <span>사전 섭외</span>
                  <PreAlert>암호키를 복사해서 전달해주세요!</PreAlert>
                </div>

                <Switch
                  colorScheme="mintTheme"
                  isChecked={isPreMember}
                  onChange={(e) => setIsPreMember(e.target.checked)}
                />
              </div>
              {isPreMember && (
                <PreMemberContainer>
                  <PreMember>
                    <div>
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => setPreCnt((old) => old - 1)}
                      />
                      <span>{preCnt}명</span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => setPreCnt((old) => old + 1)}
                      />
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          color="var(--font-h3)"
                          size="sm"
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontSize="11px">사전 섭외</PopoverHeader>
                        <PopoverBody fontSize="11px">
                          사전에 섭외한 인원수를 선택해주세요. 오른쪽의 암호키를
                          반드시 복사하고, 친구분에게 알려주세요!
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </PreMember>
                  <div>
                    <span>암호키</span>
                    <Button
                      size="sm"
                      disabled
                      colorScheme="blackAlpha"
                      mr="8px"
                    >
                      {password}
                    </Button>
                    <CopyBtn text={password} />
                  </div>
                </PreMemberContainer>
              )}
            </SlideItem>
          </Container>
          <BottomNav onClick={() => onClickNext()} text="완료" />
        </RegisterLayout>
      </Layout>
      {isSuccessScreen && (
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

const PreAlert = styled.span`
  font-size: 11px;
  color: var(--font-h3);
`;
const GatherLink = styled.span`
  margin-right: 12px;
`;

const MemberCnt = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin: 0 8px;
  }
`;

const SelectAge = styled(motion.div)`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const MaxConditionText = styled.span`
  margin: 0 !important;
  font-size: 13px;
  color: var(--font-h2);
`;

const AgeText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Age = styled.span``;

const GenderNav = styled.div``;

const PreMemberContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  > div:last-child {
    display: flex;
    align-items: center;
    > span {
      color: var(--font-h4);
      margin-right: 8px;
    }
  }
`;
const PreMember = styled.div`
  display: flex;

  align-items: center;
  > div {
    margin-right: 8px;
    > span {
      margin: 0 8px;
    }
  }
`;

const Layout = styled(motion.div)`
  height: 100vh;
`;

const Container = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid var(--font-h5);
  > div:first-child {
    span {
      margin-left: 8px;
    }
  }
`;

const SlideItem = styled(motion.div)`
  padding: 16px 0;
  border-bottom: 1px solid var(--font-h5);
  > div {
    display: flex;
    justify-content: space-between;
    > div:first-child {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const SuccessMesagge = styled.div`
  display: flex;
  flex-direction: column;
`;

export default WritingCondition;
