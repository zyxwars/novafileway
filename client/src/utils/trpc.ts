import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/routes/_app";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
