import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  status: z.enum(["active", "inactive"]).optional(),
});

export type CreateClientFormInput = z.infer<typeof createClientSchema>;

export const updateClientSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  status: z.enum(["active", "inactive"]).optional(),
});

export type UpdateClientFormInput = z.infer<typeof updateClientSchema>;
