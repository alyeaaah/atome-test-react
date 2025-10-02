
import { Zodios } from "@zodios/core";
import { endpoints } from "./endpoints";
import { ZodiosHooks } from "@zodios/react";
import { createAxiosInstance } from "@/utils/axios";
import { clientEnv } from "@/env";
export { endpoints };


export const loginApiClient = new Zodios(
  clientEnv.API_BASE_URL,
  [
    endpoints.loginApi,
    endpoints.userDataApi,
    endpoints.mediaUploadApi
  ],
  { validate: true, axiosInstance: createAxiosInstance() },
);

export const loginApiHooks = new ZodiosHooks("login", loginApiClient);
