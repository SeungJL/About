import { DispatchType } from "@/types/reactTypes";
import {
  Button,
  CustomFlowbiteTheme,
  Modal as BaseModal,
} from "flowbite-react";

export interface IFooterOptions {
  main: {
    text?: string;
    func?: () => void;
  };
  sub?: {
    text?: string;
    func?: () => void;
  };
  isFull?: boolean;
}

interface IModal {
  setIsModal: DispatchType<boolean>;
  title: string;
  footerOptions: IFooterOptions;
  children: React.ReactNode;
}
export default function Modal({
  title,
  setIsModal,
  footerOptions: {
    main: { text = "확인", func = () => setIsModal(false) },
    sub,
    isFull = true,
  },
  children,
}: IModal) {
  const { text: subText = "닫기", func: subFunc = () => setIsModal(false) } =
    sub || {};

  const customTheme: CustomFlowbiteTheme["modal"] = {
    root: {
      base: "fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto flex flex-col justify-center",
      inner:
        "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col",
    },
  };

  return (
    <BaseModal
      theme={customTheme}
      position="center"
      show={true}
      onClose={() => setIsModal(false)}
    >
      <BaseModal.Header className="p-4 ">{title}</BaseModal.Header>
      <BaseModal.Body className="pt-4 pb-1 px-5">{children}</BaseModal.Body>
      <BaseModal.Footer className="p-5 border-none">
        {isFull ? (
          <>
            {sub && (
              <Button
                size="lg"
                className="enabled:hover:bg-gray-100 bg-white border-1.5 border-mint text-mint text-base flex-1 font-semibold"
                onClick={subFunc}
              >
                {subText}
              </Button>
            )}
            <Button
              size="lg"
              className="font-semibold flex-1 ml-auto bg-mint text-white enabled:hover:mintShadow"
              onClick={func}
            >
              {text}
            </Button>
          </>
        ) : (
          <>
            {sub && <button></button>}
            <button className="ml-auto text-mint" onClick={func}>
              {text}
            </button>
          </>
        )}
      </BaseModal.Footer>
    </BaseModal>
  );
}
