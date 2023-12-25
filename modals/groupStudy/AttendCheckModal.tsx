import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { GROUP_STUDY_ALL } from "../../constants/keys/queryKeys";
import { GROUP_STUDY_ATTEND_SUB_LIST } from "../../constants/settingValue/groupStudy";
import { dayjsToFormat, getDateWeek } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { useGroupStudyAttendMutation } from "../../hooks/groupStudy/mutations";
import { IModal } from "../../types/reactTypes";

interface IAttendCheckModal extends IModal {
  id: number;
  attendRecord: string[];
  attendRecordSub: string[];
  type: "this" | "last";
}

function AttendCheckModal({
  type,
  id,
  attendRecord,
  attendRecordSub,
  setIsModal,
}: IAttendCheckModal) {
  const completeToast = useCompleteToast();

  const dateWeek = getDateWeek(dayjs());

  const [myAttend, setMyAttend] = useState<string[]>(attendRecord);
  const [mySubAttend, setMySubAttend] = useState<string[]>(attendRecordSub);

  const resetQueryData = useResetQueryData();

  const isSubRecord = GROUP_STUDY_ATTEND_SUB_LIST.includes(+id);

  const { mutate, isLoading } = useGroupStudyAttendMutation(id, {
    onSuccess() {
      completeToast("free", "저장되었습니다.");
      resetQueryData([GROUP_STUDY_ALL]);
      setIsModal(false);
    },
  });

  const dayArr = [];
  for (let i = 0; i < 7; i++) {
    const firstDay = dayjs().startOf("week").add(1, "day");
    dayArr.push(firstDay.add(i, "day"));
  }

  const onClickBtn = (day: string | "all") => {
    if (day === "all") {
      setMyAttend((old) =>
        old.length === 7 ? [] : ["월", "화", "수", "목", "금", "토", "일"]
      );
      setMySubAttend([]);
      return;
    }
    if (myAttend.includes(day)) {
      setMyAttend((old) => old.filter((item) => item !== day));
      setMySubAttend((old) => [...old, day]);
    } else if (mySubAttend.includes(day)) {
      setMySubAttend((old) => old.filter((item) => item !== day));
    } else setMyAttend((old) => [...old, day]);
  };

  const onSubmit = () => {
    mutate({ weekRecord: myAttend, type, weekRecordSub: mySubAttend });
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="lg">
      <ModalHeader text={`${dateWeek}주차 출석체크`} />
      <ModalBody>
        <CheckContainer>
          {dayArr.map((item, idx) => {
            const day = dayjsToFormat(item, "ddd");
            return (
              <Button
                key={idx}
                onClick={() => onClickBtn(day)}
                colorScheme={
                  myAttend?.includes(day)
                    ? "mintTheme"
                    : mySubAttend?.includes(day)
                    ? "yellowTheme"
                    : "gray"
                }
              >
                {dayjsToFormat(item, "ddd요일")}
              </Button>
            );
          })}
          <Button
            colorScheme={myAttend.length === 7 ? "mintTheme" : "gray"}
            w="64px"
            onClick={() => onClickBtn("all")}
          >
            전체
          </Button>
        </CheckContainer>
        <ColorView>
          <ColorItem>
            <Color color="var(--color-mint)" />
            <span>완료</span>
          </ColorItem>
          <ColorItem>
            <Color color="#FEBC5A" />
            <span>절반 완료</span>
          </ColorItem>
          <ColorItem>
            <Color color="#E2E8F0" />
            <span>미실시</span>
          </ColorItem>
        </ColorView>
      </ModalBody>
      <ModalFooterTwo
        rightText="저장"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
        isLoading={isLoading}
      />
    </ModalLayout>
  );
}

const ColorView = styled.div`
  margin-top: var(--margin-main);
  display: flex;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--margin-sub);
  > span {
    font-size: 13px;
    color: var(--font-h3);
  }
`;

const Color = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: var(--margin-md);
`;

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
