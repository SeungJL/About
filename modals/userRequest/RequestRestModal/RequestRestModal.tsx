import { Button, ModalFooter } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ModalHeader, ModalLayout } from "../../../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../../../hooks/CustomToast";
import {
  useUserApplyRestMutation,
  useUserRequestMutation,
  useUserRoleMutation,
} from "../../../hooks/user/mutations";
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
  const { mutate: setRole } = useUserRoleMutation();
  const { mutate: applyRest } = useUserApplyRestMutation({
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
    setRole("resting");
    sendRestRequest(requestData);
    applyRest(restInfo);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="휴식신청" />
      <RequestRestModalInfo onSubmit={onSubmit} />
      <ModalFooter p="var(--padding-sub) var(--padding-main)">
        <Button variant="ghost" type="button" onClick={() => setIsModal(false)}>
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
