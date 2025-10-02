import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { registerSchema } from "./schema";
import { userDataSchema } from "@/pages/Login/api/schema";

const RegisterApi = makeEndpoint({
  alias: "register",
  method: "post",
  path: `/user`,
  parameters: parametersBuilder().addBody(registerSchema).build(),
  response: userDataSchema
});

export const endpoints = {
  RegisterApi
};