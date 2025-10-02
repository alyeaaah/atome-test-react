import { makeEndpoint } from "@zodios/core";
import { z } from "zod";
import { generalReportSchema } from "./schema";

const GeneralReportApi = makeEndpoint({
  alias: "getGeneralReport",
  method: "get",
  path: `/store/inventory`,
  response: generalReportSchema
});

export const endpoints = {
  GeneralReportApi
}