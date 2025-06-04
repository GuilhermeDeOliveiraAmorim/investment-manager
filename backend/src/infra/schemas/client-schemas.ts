import { FastifyInstance } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createClientBodySchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(1, { message: "O nome não pode estar vazio." }),

  email: z
    .string({
      required_error: "O email é obrigatório.",
      invalid_type_error: "O email deve ser uma string.",
    })
    .email({ message: "O email deve ser válido." }),

  status: z
    .enum(["active", "inactive"], {
      invalid_type_error: "Status deve ser 'active' ou 'inactive'.",
    })
    .optional(),
});

export const updateClientBodySchema = z.object({
  name: z
    .string({
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(1, { message: "O nome não pode estar vazio." })
    .optional(),

  email: z
    .string({
      invalid_type_error: "O email deve ser uma string.",
    })
    .email({ message: "O email deve ser válido." })
    .optional(),

  status: z
    .enum(["active", "inactive"], {
      invalid_type_error: "O status deve ser 'active' ou 'inactive'.",
    })
    .optional(),
});

export const findClientByIdParamsSchema = z.object({
  id: z
    .string({
      required_error: "O ID é obrigatório.",
      invalid_type_error: "O ID deve ser uma string.",
    })
    .uuid({ message: "O ID deve estar no formato UUID válido." }),
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
