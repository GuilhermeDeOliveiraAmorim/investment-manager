import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z
    .enum(["active", "inactive"], {
      errorMap: () => ({ message: "Selecione um status válido" }),
    })
    .optional(),
});

export type CreateClientFormData = z.infer<typeof createClientSchema>;
