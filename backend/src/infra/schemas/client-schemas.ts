import { FastifyInstance } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createClientInputSchema = z.object({
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

export const createClientOutputSchema = z.object({
  client: z.object({
    name: z.string(),
    email: z.string().email(),
    status: z.enum(["active", "inactive"]),
  }),
});

export const updateClientInputSchema = z.object({
  name: z
    .string({
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(1, { message: "O nome não pode estar vazio." })
    .optional(),

  status: z
    .enum(["active", "inactive"], {
      invalid_type_error: "O status deve ser 'active' ou 'inactive'.",
    })
    .optional(),
});

export const updateClientOutputSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.enum(["active", "inactive"]),
});

export const findClientByIdInputSchema = z.object({
  id: z
    .string({
      required_error: "O ID é obrigatório.",
      invalid_type_error: "O ID deve ser uma string.",
    })
    .uuid({ message: "O ID deve estar no formato UUID válido." }),
});

const clientSummarySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.enum(["active", "inactive"]),
  totalInvested: z.number(),
});

const allocationSummarySchema = z.object({
  id: z.string().uuid(),
  assetId: z.string().uuid(),
  assetName: z.string(),
  currentValue: z.number(),
  percentage: z.number(),
});

export const findClientByIdOutputSchema = z.object({
  client: clientSummarySchema,
  allocations: z.array(allocationSummarySchema),
});

export const findAllClientsOutputSchema = z.object({
  clients: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      status: z.enum(["active", "inactive"]),
    })
  ),
});

export const registerClientSchemas = (server: FastifyInstance) => {
  server.addSchema({
    ...zodToJsonSchema(createClientInputSchema),
    $id: "CreateClientInput",
  });

  server.addSchema({
    ...zodToJsonSchema(createClientOutputSchema),
    $id: "CreateClientOutput",
  });

  server.addSchema({
    ...zodToJsonSchema(updateClientInputSchema),
    $id: "UpdateClientInput",
  });

  server.addSchema({
    ...zodToJsonSchema(updateClientOutputSchema),
    $id: "UpdateClientOutput",
  });

  server.addSchema({
    ...zodToJsonSchema(findClientByIdInputSchema),
    $id: "FindClientByIdInput",
  });

  server.addSchema({
    ...zodToJsonSchema(findClientByIdOutputSchema),
    $id: "FindClientByIdOutput",
  });

  server.addSchema({
    ...zodToJsonSchema(findAllClientsOutputSchema),
    $id: "FindAllClientsOutput",
  });
};
