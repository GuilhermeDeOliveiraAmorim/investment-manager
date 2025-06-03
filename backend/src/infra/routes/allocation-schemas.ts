import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

export const createAllocationBodySchema = z.object({
  clientId: z.string().uuid(),
  assetId: z.string().uuid(),
  currentValue: z.number().positive(),
});

export const allocationResponseSchema = z.object({
  allocation: z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    assetId: z.string().uuid(),
    currentValue: z.number().positive(),
  }),
});

export const registerAllocationSchemas = (server: FastifyInstance) => {
  server.addSchema({
    ...zodToJsonSchema(createAllocationBodySchema),
    $id: "CreateAllocationBody",
  });

  server.addSchema({
    ...zodToJsonSchema(allocationResponseSchema),
    $id: "AllocationResponse",
  });
};
