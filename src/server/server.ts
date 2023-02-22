import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { removeProduct } from "./lambdas/Product/delete-product.lambda";
import { editProduct } from "./lambdas/Product/edit-product.lambda";
import { getProducts } from "./lambdas/Product/get-all-products.lambda";
import { getProduct } from "./lambdas/Product/get-product.lambda";

const t = initTRPC.create();

export const { router } = t;
export const { middleware } = t;
export const publicProcedure = t.procedure;

const appRouter = router({
  getProducts: publicProcedure.query(async () => getProducts),
  getProduct: publicProcedure.query(async () => getProduct),
  editProduct: publicProcedure.query(async () => editProduct),
  removeProduct: publicProcedure.query(async () => removeProduct)
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
