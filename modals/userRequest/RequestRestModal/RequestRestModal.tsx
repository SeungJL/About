import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import { useCompleteToast, useFailToast } from "../../../hooks/CustomToast";
import {
  useUserApplyRestMutation,
  useUserRequestMutation,
} from "../../../hooks/user/mutations";
import { ModalFooterNav } from "../../../styles/layout/modal";
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

  const { mutate: applyRest } = useUserApplyRestMutation({
    onSuccess() {
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

    sendRestRequest(requestData);
    applyRest(restInfo);
    setIsModal(false);
  };

  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="휴식신청" setIsModal={setIsModal} />
      <RequestRestModalInfo onSubmit={onSubmit} />
      <ModalFooterNav>
        <button type="button" onClick={() => setIsModal(false)}>
          취소
        </button>
        <button type="submit" form="rest">
          제출
        </button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

export default RequestRestModal;
