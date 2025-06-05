import { FastifyInstance } from "fastify";
import { ClientFactory } from "../factories/client.factory";
import {
  createClientInputSchema,
  updateClientInputSchema,
} from "../schemas/client-schemas";

export async function clientRoutes(server: FastifyInstance) {
  const clientUseCases = ClientFactory();

  server.route({
    method: "POST",
    url: "/clients",
    schema: {
      body: { $ref: "CreateClientInput#" },
      response: {
        201: { $ref: "CreateClientOutput#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
      },
      tags: ["Clients"],
      description: "Create a new client",
    },
    handler: async (request, reply) => {
      const parseResult = createClientInputSchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      const result = await clientUseCases.create.execute(parseResult.data);
      return reply.status(201).send(result);
    },
  });

  server.route({
    method: "GET",
    url: "/clients",
    schema: {
      response: {
        200: { $ref: "FindAllClientsOutput#" },
      },
      tags: ["Clients"],
      description: "Get all clients",
    },
    handler: async (_request, reply) => {
      const result = await clientUseCases.findAll.execute();

      return reply.status(200).send(result);
    },
  });

  server.route({
    method: "GET",
    url: "/clients/:id",
    schema: {
      params: { $ref: "FindClientByIdInput#" },
      response: {
        200: { $ref: "FindClientByIdOutput#" },
      },
      tags: ["Clients"],
      description: "Get client by ID",
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };

      const result = await clientUseCases.findById.execute({ id });

      if (!result.client) {
        return reply.status(404).send({ error: "Client not found" });
      }

      return reply.status(200).send(result);
    },
  });

  server.route({
    method: "PUT",
    url: "/clients/:id",
    schema: {
      body: { $ref: "UpdateClientInput#" },
      params: { $ref: "FindClientByIdInput#" },
      response: {
        200: { $ref: "UpdateClientOutput#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
      },
      tags: ["Clients"],
      description: "Update client by ID",
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };

      const parseResult = updateClientInputSchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      const { email, name, status } = parseResult.data;

      if (email === undefined || name === undefined || status === undefined) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: [
            ...(email === undefined
              ? [{ path: ["email"], message: "Email is required" }]
              : []),
            ...(name === undefined
              ? [{ path: ["name"], message: "Name is required" }]
              : []),
            ...(status === undefined
              ? [{ path: ["status"], message: "Status is required" }]
              : []),
          ],
        });
      }

      const result = await clientUseCases.update.execute({
        id,
        email,
        name,
        status,
      });

      return reply.status(200).send(result);
    },
  });
}
