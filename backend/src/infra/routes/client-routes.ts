import { FastifyInstance } from "fastify";
import { ClientFactory } from "../factories/client.factory";
import {
  createClientBodySchema,
  findClientByIdParamsSchema,
  registerClientSchemas,
  updateClientBodySchema,
} from "./client-schemas";

export async function clientRoutes(server: FastifyInstance) {
  const clientUseCases = ClientFactory();

  registerClientSchemas(server);

  server.route({
    method: "POST",
    url: "/clients",
    schema: {
      body: { $ref: "CreateClientBody#" },
      response: {
        201: { $ref: "ClientResponse#" },
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
      tags: ["Clients"],
      description: "Create a new client",
    },
    handler: async (request, reply) => {
      const parseResult = createClientBodySchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      try {
        const result = await clientUseCases.create.execute(parseResult.data);
        return reply.status(201).send(result);
      } catch {
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });

  server.route({
    method: "GET",
    url: "/clients",
    schema: {
      response: {
        200: { $ref: "FindAllClientsResponse#" },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
      tags: ["Clients"],
      description: "Get all clients",
    },
    handler: async (_request, reply) => {
      try {
        const result = await clientUseCases.findAll.execute();
        return reply.status(200).send(result);
      } catch {
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });

  server.route({
    method: "GET",
    url: "/clients/:id",
    schema: {
      params: { $ref: "FindClientByIdParams#" },
      response: {
        200: { $ref: "ClientResponse#" },
        404: {
          type: "object",
          properties: { error: { type: "string" } },
        },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
      tags: ["Clients"],
      description: "Get client by ID",
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const result = await clientUseCases.findById.execute({ id });

        if (!result.client) {
          return reply.status(404).send({ error: "Client not found" });
        }

        return reply.status(200).send({ client: result.client });
      } catch {
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });

  server.route({
    method: "PUT",
    url: "/clients/:id",
    schema: {
      body: { $ref: "UpdateClientBody#" },
      params: { $ref: "FindClientByIdParams#" },
      response: {
        200: { $ref: "ClientResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
        404: {
          type: "object",
          properties: { error: { type: "string" } },
        },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
      tags: ["Clients"],
      description: "Update client by ID",
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const parseResult = updateClientBodySchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }

      try {
        const result = await clientUseCases.update.execute({
          id,
          ...parseResult.data,
        });
        return reply.status(200).send(result);
      } catch (err: any) {
        if (err.message === "Client not found") {
          return reply.status(404).send({ error: "Client not found" });
        }

        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });
}
