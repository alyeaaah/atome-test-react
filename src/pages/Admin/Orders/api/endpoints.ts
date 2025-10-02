import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";
import { OrderSchema } from "./schema";

const OrderByIdApi = makeEndpoint({
  alias: "getOrderById",
  method: "get",
  path: `store/order/:orderId`,
  parameters: parametersBuilder().addPaths({
    orderId: z.string(),
  }).build(),
  response: OrderSchema.or(z.string())
});


const OrderDeleteApi = makeEndpoint({
  alias: "deleteOrder",
  method: "delete",
  path: `store/order/:orderId`,
  parameters: parametersBuilder().addPaths({
    orderId: z.string(),
  }).build(),
  response: z.string()
});


export const endpoints = {
  OrderByIdApi,
  OrderDeleteApi,
}