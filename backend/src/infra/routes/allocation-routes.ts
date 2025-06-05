import { FastifyInstance } from "fastify";
import { AllocationFactory } from "../factories/allocation.factory";
import {
  createAllocationBodySchema,
  updateAllocationBodySchema,
} from "../schemas/allocation-schemas";

export async function allocationRoutes(server: FastifyInstance) {
  const allocationUseCases = AllocationFactory();

  server.route({
    method: "POST",
    url: "/allocations",
    schema: {
      body: {
        type: "object",
        properties: {
          clientId: {
            type: "string",
            example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
          assetId: {
            type: "string",
            example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
          currentValue: {
            type: "number",
            example: "1000000",
          },
        },
        required: ["clientId", "assetId", "currentValue"],
      },
      response: {
        201: { $ref: "AllocationResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
      },
      tags: ["Allocations"],
      description: "Create a new allocation",
    },
    handler: async (request, reply) => {
      const parseResult = createAllocationBodySchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      const result = await allocationUseCases.create.execute(parseResult.data);
      return reply.status(201).send(result);
    },
  });

  server.route({
    method: "PUT",
    url: "/allocations",
    schema: {
      body: { $ref: "UpdateAllocationBody#" },
      response: {
        201: { $ref: "AllocationResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
      },
      tags: ["Allocations"],
      description: "Update an allocation",
    },
    handler: async (request, reply) => {
      const parseResult = updateAllocationBodySchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      const result = await allocationUseCases.update.execute(parseResult.data);
      return reply.status(201).send(result);
    },
  });
}
