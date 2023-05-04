import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProtalProps {
  children?: ReactNode;
}

const Modal_portal = ({ children }: ProtalProps) => {
  const [mounted, setMounted] = useState(false);
  const modal = document.querySelector("#modal");
  useEffect(() => {
    setMounted(true);
    modal?.classList.add("open");
    return () => {
      setMounted(false);
      modal?.classList.remove("open");
    };
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#modal") as HTMLElement)
    : null;
};

export default Modal_portal;
