import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { dayjsToFormat, getDateWeek } from "../../helpers/dateHelpers";
import { IModal } from "../../types/reactTypes";

interface IAttendCheckModal extends IModal {}

function AttendCheckModal({ setIsModal }: IAttendCheckModal) {
  const dateWeek = getDateWeek(dayjs());
  const arr = ["월", "화", "수"];

  const dayArr = [];
  for (let i = 0; i < 7; i++) {
    const firstDay = dayjs().startOf("week").add(1, "day");
    dayArr.push(firstDay.add(i, "day"));
  }
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="lg">
      <ModalHeader text={`${dateWeek}주차 출석체크`} />
      <ModalBody>
        <CheckContainer>
          {dayArr.map((item, idx) => (
            <Button key={idx}>{dayjsToFormat(item, "ddd요일")}</Button>
          ))}
          <Button w="64px">전체</Button>
        </CheckContainer>
      </ModalBody>
      <ModalFooterTwo rightText="저장" onClickLeft={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const Layout = styled.div``;

const CheckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > button {
    margin-bottom: var(--margin-sub);
  }
`;

export default AttendCheckModal;
