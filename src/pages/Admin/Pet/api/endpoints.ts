import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";
import { RcFile } from "antd/es/upload";
import { petFormSchema, petSchema } from "./schema";

const PetByStatusApi = makeEndpoint({
  alias: "getPetListByStatus",
  method: "get",
  path: `/pet/findByStatus`,
  parameters: parametersBuilder().addQueries({
    status: z.enum(['available', 'pending', 'sold']),
  }).build(),
  response: z.array(petSchema)
});
const PetByTagsApi = makeEndpoint({
  alias: "getPetListByTags",
  method: "get",
  path: `/pet/findByTags`,
  parameters: parametersBuilder().addQueries({
    tags: z.string().array(),
  }).build(),
  response: z.array(petSchema)
});

const PetByIdApi = makeEndpoint({
  alias: "getPetById",
  method: "get",
  path: `/pet/:petId`,
  parameters: parametersBuilder().addPaths({
    petId: z.string(),
  }).build(),
  response: petSchema
});

const PetUpdateApi = makeEndpoint({
  alias: "updatePet",
  method: "put",
  path: `/pet`,
  parameters: parametersBuilder().addBody(petFormSchema).build(),
  response: petSchema
});

const PetCreateApi = makeEndpoint({
  alias: "createPet",
  method: "post",
  path: `/pet`,
  parameters: parametersBuilder().addBody(petFormSchema).build(),
  response: petSchema
});

const PetDeleteApi = makeEndpoint({
  alias: "deletePet",
  method: "delete",
  path: `/pet/:petId`,
  parameters: parametersBuilder().addPaths({
    petId: z.string(),
  }).build(),
  response: z.string()
});

const UploadImageApi = makeEndpoint({
  alias: "uploadImage",
  method: "post",
  path: `/pet/:petId/uploadImage`,
  parameters: parametersBuilder()
    .addPaths({
      petId: z.string(),
    })
    .addQueries({
      additionalMetadata: z.string().optional()
    })
    .addBody(z.instanceof(Blob))
    .build(),
  requestFormat: "binary",
  response: petSchema
});


export const endpoints = {
  PetByStatusApi,
  PetByTagsApi,
  PetByIdApi,
  PetUpdateApi,
  PetCreateApi,
  PetDeleteApi,
  UploadImageApi
}