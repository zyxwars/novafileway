import { AnimatePresence } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export const Modal = ({
  isOpen = true,
  children,
  ...props
}: { isOpen?: boolean } & ComponentPropsWithoutRef<"div">) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          {...{
            ...props,
            className: [
              "fixed top-0 bottom-0 right-0 left-0",
              props.className,
            ].join(" "),
          }}
        >
          {children}
        </div>
      )}
    </AnimatePresence>
  );
};
