import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FullScreen } from "../styles/LayoutStyles";

const ModalPortal = ({ children, closePortal }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  const closeModal = () => {
    closePortal(false);
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
};
export default ModalPortal;