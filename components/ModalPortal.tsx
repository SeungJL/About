import { SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FullScreen } from "../styles/layout/modal";

interface IModalPortal {
  children: React.ReactNode;
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function ModalPortal({ children, setIsModal }: IModalPortal) {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    setMounted(true);

    if (document) {
      const dom = document.getElementById("root-modal");
      ref.current = dom;
    }
  }, []);
  if (ref.current && mounted) {
    return createPortal(
      <div className="modal-container">
        <FullScreen onClick={closeModal} />
        {children}
      </div>,
      ref.current
    );
  }
  return null;
}

export default ModalPortal;
