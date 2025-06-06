import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Selecione um status válido" }),
  }),
});

export type CreateClientFormData = z.infer<typeof createClientSchema>;

export const updateClientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Selecione um status válido" }),
  }),
});

export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
