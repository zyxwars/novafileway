import { AnimatePresence } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect } from "react";

export const Modal = ({
  isOpen,
  // Side effect after clicking outside, trigger close here for example
  onClickOutside,
  // Side effect after closing
  onClose,
  children,
  ...props
}: {
  isOpen: boolean;
  onClickOutside: () => void;
  onClose?: () => void;
} & ComponentPropsWithoutRef<"div">) => {
  useEffect(() => {
    if (isOpen) return;
    if (onClose) onClose();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="item-center fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={onClickOutside}
        >
          {children}
        </div>
      )}
    </AnimatePresence>
  );
};
