import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

export const createAllocationBodySchema = z.object({
  clientId: z
    .string({
      required_error: "O ID do cliente é obrigatório",
      invalid_type_error: "O ID do cliente deve ser uma string",
    })
    .uuid("O ID do cliente deve estar em formato UUID válido"),

  assetId: z
    .string({
      required_error: "O ID do ativo é obrigatório",
      invalid_type_error: "O ID do ativo deve ser uma string",
    })
    .uuid("O ID do ativo deve estar em formato UUID válido"),

  currentValue: z
    .number({
      required_error: "O valor atual é obrigatório",
      invalid_type_error: "O valor atual deve ser um número",
    })
    .positive("O valor atual deve ser positivo")
    .max(1_000_000_000, "O valor atual não pode exceder R$ 1 bilhão"),
});

export const updateAllocationBodySchema = z.object({
  allocationId: z
    .string({
      required_error: "O ID da alocação é obrigatório",
      invalid_type_error: "O ID da alocação deve ser uma string",
    })
    .uuid("O ID da alocação deve estar em formato UUID válido"),

  currentValue: z
    .number({
      required_error: "O valor atual é obrigatório",
      invalid_type_error: "O valor atual deve ser um número",
    })
    .positive("O valor atual deve ser positivo")
    .max(1_000_000_000, "O valor atual não pode exceder R$ 1 bilhão"),
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
    ...zodToJsonSchema(updateAllocationBodySchema),
    $id: "UpdateAllocationBody",
  });

  server.addSchema({
    ...zodToJsonSchema(allocationResponseSchema),
    $id: "AllocationResponse",
  });
};
