import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { removeUser } from "./lambdas/User/delete-user.lambda";
import { editUser } from "./lambdas/User/edit-user.lambda";
import { getUsers } from "./lambdas/User/get-all-users.lambda";
import { getUser } from "./lambdas/User/get-user.lambda";

const t = initTRPC.create();

export const { router } = t;
export const { middleware } = t;
export const publicProcedure = t.procedure;

const appRouter = router({
  getUsers: publicProcedure.query(async () => getUsers),
  getUser: publicProcedure.query(async () => getUser),
  editUser: publicProcedure.query(async () => editUser),
  removeUser: publicProcedure.query(async () => removeUser)
});

export type AppRouter = typeof appRouter;

const createContext = () => ({}); // no context

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
  responseMeta: () => ({
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
});
