
import { Zodios } from "@zodios/core";
import { endpoints } from "./endpoints";
import { ZodiosHooks } from "@zodios/react";
import { createAxiosInstance } from "@/utils/axios";
import { clientEnv } from "@/env";
export { endpoints };


export const PetApiClient = new Zodios(
  clientEnv.API_BASE_URL,
  [
    endpoints.PetByStatusApi,
    endpoints.PetByTagsApi,
    endpoints.PetByIdApi,
    endpoints.PetCreateApi,
    endpoints.PetUpdateApi,
    endpoints.PetDeleteApi,
    endpoints.UploadImageApi,
  ],
  { validate: true, axiosInstance: createAxiosInstance() },
);

export const PetApiHooks = new ZodiosHooks("pets", PetApiClient);
