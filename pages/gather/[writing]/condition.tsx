import {
  Button,
  FormControl,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slide,
  Switch,
} from "@chakra-ui/react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faExclamationCircle,
  faMinus,
  faMinusCircle,
  faPlus,
  faPlusCircle,
  faUserGroup,
  faUsers,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import ProgressLayout from "../../../components/layouts/ProgressLayout";
import RegisterLayout from "../../../pagesComponents/Register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/Register/RegisterOverview";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const AGE_BAR = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

function WritingContent() {
  const [maxValue, setMaxValue] = useState(4);
  const [minValue, setMinValue] = useState(4);
  const [genderCondition, setGenderCondition] = useState(false);
  const [ageCondition, setAgeCondition] = useState(false);

  const onClickNext = () => {};

  const onClickAge = () => {};
  console.log(ageCondition);
  return (
    <Layout>
      <ProgressLayout value={11} />
      <Header title="" url="/gather" />
      <RegisterLayout>
        <RegisterOverview>
          <span>조건을 선택해 주세요.</span>
        </RegisterOverview>
        <Container>
          <Item>
            <div>
              <FontAwesomeIcon icon={faUserGroup} />
              <span>최대 인원</span>
            </div>
            <MemberCnt>
              <FontAwesomeIcon
                icon={faMinus}
                onClick={() => setMaxValue((old) => old - 1)}
              />
              <span>{maxValue}명</span>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => setMaxValue((old) => old + 1)}
              />
            </MemberCnt>
          </Item>
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
                  <PopoverHeader fontSize="11px">네비게이션 기능</PopoverHeader>
                  <PopoverBody fontSize="11px">
                    성별 비율을 최대 2대1까지 제한합니다.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>
            <Switch
              colorScheme="mint"
              isChecked={genderCondition}
              onChange={(e) => setGenderCondition(e.target.checked)}
            />
          </Item>
          <SlideItem layout>
            <div>
              <div>
                <FontAwesomeIcon icon={faUser} />
                <span>나이</span>
              </div>

              <Switch
                colorScheme="mint"
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
                  defaultValue={[21, 25]}
                  min={20}
                  max={29}
                  step={1}
                  width="97%"
                  alignSelf="center"
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
        </Container>
        <BottomNav onClick={() => onClickNext()} text="완료" />
      </RegisterLayout>
    </Layout>
  );
}

const MemberCnt = styled.div`
  > span {
    margin: 0 8px;
  }
`;

const SelectAge = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const AgeText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Age = styled.span``;

const GenderNav = styled.div``;

const Layout = styled.div``;

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

export default WritingContent;
