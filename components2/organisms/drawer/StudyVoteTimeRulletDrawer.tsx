import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IModal } from "../../../types/reactTypes";
import ScreenOverlay from "../../atoms/ScreenOverlay";
import RulletPickerTwo from "../../molecules/picker/RulletPickerTwo";
interface IStudyVoteTimeRulletDrawer extends IModal {
  setMyVote: any;
}
export default function StudyVoteTimeRulletDrawer({
  setMyVote,
  setIsModal,
}: IStudyVoteTimeRulletDrawer) {
  const onClickOverlay = (e) => {
    e.stopPropagation();
    setIsModal(false);
  };

  return (
    <>
      <ScreenOverlay onClick={(e) => onClickOverlay(e)} />
      <TimeModalLayout
        initial={{ y: "90vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TopNav />
        <Header>
          <span>{dayjs().locale("ko").format("M월 DD일 ddd요일")}</span>
          <span>스터디 참여시간을 선택해주세요!</span>
        </Header>
        <RulletPickerTwo />
        <Button
          w="100%"
          colorScheme="mintTheme"
          size="lg"
          borderRadius="var(--border-radius-sub)"
          mt="20px"
          // onClick={onSubmit}
        >
          선택 완료
        </Button>
      </TimeModalLayout>
    </>
  );
}

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: var(--max-width);

  border-top-left-radius: var(--border-radius-main);
  border-top-right-radius: var(--border-radius-main);
  background-color: white;
  z-index: 5000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--font-h5);
  margin-bottom: var(--margin-max);
`;
const Header = styled.header`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--margin-max);
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--font-h2);
    margin-bottom: var(--margin-min);
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;
