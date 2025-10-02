
import { Zodios } from "@zodios/core";
import { endpoints } from "./endpoints";
import { ZodiosHooks } from "@zodios/react";
import { createAxiosInstance } from "@/utils/axios";
import { clientEnv } from "@/env";
export { endpoints };


export const OrderApiClient = new Zodios(
  clientEnv.API_BASE_URL,
  [
    endpoints.OrderByIdApi,
    endpoints.OrderDeleteApi,
  ],
  { validate: true, axiosInstance: createAxiosInstance() },
);

export const OrderApiHooks = new ZodiosHooks("orders", OrderApiClient);
