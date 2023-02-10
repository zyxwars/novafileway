import { AnimatePresence } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
} & ComponentPropsWithoutRef<"div">) => {
  return (
    // TODO: Do not propagate the on click event back from the children
    <AnimatePresence>
      {isOpen && (
        <div
          className="item-center fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={onClose}
        >
          {children}
        </div>
      )}
    </AnimatePresence>
  );
};
