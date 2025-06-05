import { FastifyInstance } from "fastify";
import { AllocationFactory } from "../factories/allocation.factory";
import { createAllocationBodySchema, updateAllocationBodySchema } from "../schemas/allocation-schemas";

export async function allocationRoutes(server: FastifyInstance) {
  const allocationUseCases = AllocationFactory();

  server.route({
    method: "POST",
    url: "/allocations",
    schema: {
      body: { $ref: "CreateAllocationBody#" },
      response: {
        201: { $ref: "AllocationResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
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
        500: {
          type: "object",
          properties: { error: { type: "string" } },
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
