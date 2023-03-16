import { TRPCClientErrorLike } from "@trpc/client";

export const ErrorContainer = ({
  children,
}: {
  children: TRPCClientErrorLike<any>;
}) => {
  return (
    <div className="flex flex-grow items-center justify-center p-8 font-bold text-red-500">
      {children.data?.stack ? children.data.stack : children.message}
    </div>
  );
};
