import { IModal } from "../types/hooks/reactTypes";
import { IAlertModalOptions } from "./AlertModal";
import AlertSimpleModal from "./AlertSimpleModal";

export default function AlertNotCompletedModal({ setIsModal }: IModal) {
  const options: IAlertModalOptions = {
    title: "준비중",
    subTitle: "준비중인 기능입니다.",
    func: () => setIsModal(false),
  };
  return <AlertSimpleModal options={options} setIsModal={setIsModal} />;
}
