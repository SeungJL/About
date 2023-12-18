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
import { dayjsToFormat, getDateWeek } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { useGroupStudyAttendMutation } from "../../hooks/groupStudy/mutations";
import { IModal } from "../../types/reactTypes";

interface IAttendCheckModal extends IModal {
  id: number;
  attendRecord: string[];
  type: "this" | "last";
}

function AttendCheckModal({
  type,
  id,
  attendRecord,
  setIsModal,
}: IAttendCheckModal) {
  const completeToast = useCompleteToast();

  const dateWeek = getDateWeek(dayjs());

  const [myAttend, setMyAttend] = useState<string[]>(attendRecord);

  const resetQueryData = useResetQueryData();

  const { mutate } = useGroupStudyAttendMutation(id, {
    onSuccess(data) {
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
      return;
    }
    setMyAttend((old) =>
      old.includes(day) ? old.filter((item) => item !== day) : [...old, day]
    );
  };

  const onSubmit = () => {
    mutate({ weekRecord: myAttend, type });
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
                colorScheme={myAttend?.includes(day) ? "mintTheme" : "gray"}
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
      </ModalBody>
      <ModalFooterTwo
        rightText="저장"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
      />
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
