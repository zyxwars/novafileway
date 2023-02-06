import { PropsWithChildren } from "react";

// TODO: Find the proper way to do props with children and pass extra props to the div
export const Modal = ({
  children,
  isOpen = true,
}: PropsWithChildren<{ isOpen?: boolean }>) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 bottom-0 right-0 left-0">{children}</div>
      )}
    </>
  );
};
