import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FullScreen } from "../styles/layout/modal";
import { IModal } from "../types/reactTypes";

interface IModalPortal extends IModal {
  children: React.ReactNode;
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
