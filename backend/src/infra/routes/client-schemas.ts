import { FastifyInstance } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createClientBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]).optional(),
});

export const updateClientBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});

export const findClientByIdParamsSchema = z.object({
  id: z.string().uuid(),
});

const clientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});

export const clientResponseSchema = z.object({
  client: clientSchema,
});

export const findAllClientsResponseSchema = z.object({
  clients: z.array(clientSchema),
});

export const registerClientSchemas = (server: FastifyInstance) => {
  server.addSchema({
    ...zodToJsonSchema(createClientBodySchema),
    $id: "CreateClientBody",
  });

  server.addSchema({
    ...zodToJsonSchema(updateClientBodySchema),
    $id: "UpdateClientBody",
  });

  server.addSchema({
    ...zodToJsonSchema(findClientByIdParamsSchema),
    $id: "FindClientByIdParams",
  });

  server.addSchema({
    ...zodToJsonSchema(clientResponseSchema),
    $id: "ClientResponse",
  });

  server.addSchema({
    ...zodToJsonSchema(findAllClientsResponseSchema),
    $id: "FindAllClientsResponse",
  });
};
