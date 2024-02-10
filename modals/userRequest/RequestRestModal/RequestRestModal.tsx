import { Button, ModalFooter } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
import { ModalHeader, ModalLayout } from "../../../components/modals/Modals";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useUserInfoFieldMutation } from "../../../hooks/user/mutations";
import { useUserRequestMutation } from "../../../hooks/user/sub/request/mutations";
import { IModal } from "../../../types/reactTypes";
import { IUserRequest } from "../../../types/user/userRequest";
import RequestRestModalInfo from "./RequestRestModalInfo";

export interface IApplyRest {
  type: "일반" | "특별";
  startDate: string | Dayjs;
  endDate: string | Dayjs;
  content: string;
}

function RequestRestModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const { mutate: sendRestRequest } = useUserRequestMutation();

  const { mutate: setRole } = useUserInfoFieldMutation("role");
  const { mutate: setRest } = useUserInfoFieldMutation("rest", {
    onSuccess() {
      setIsModal(false);
      completeToast("apply");
    },
    onError(err) {
      console.error(err);
      failToast("error");
    },
  });

  const onSubmit = (data: IApplyRest) => {
    if (!data.endDate) {
      failToast("free", "종료 일정을 선택해주세요.");
      return;
    }
    const restInfo = {
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      content: data.content,
    };
    const requestData: IUserRequest = {
      category: "휴식",
      writer: session.user.name,
      content:
        data.type +
        " / " +
        data.startDate +
        " ~ " +
        data.endDate +
        " / " +
        data.content,
    };
    setRole({ role: "resting" });
    sendRestRequest(requestData);
    setRest({ info: restInfo });
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="휴식신청" />
      <RequestRestModalInfo onSubmit={onSubmit} />
      <ModalFooter p="var(--padding-main) var(--padding-max)">
        <Button
          mr="var(--margin-sub)"
          variant="ghost"
          type="button"
          onClick={() => setIsModal(false)}
        >
          취소
        </Button>
        <Button
          form="rest"
          type="submit"
          variant="ghost"
          color="var(--color-mint)"
        >
          제출
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
}

export default RequestRestModal;
