import { z } from "zod";

export const createAllocationSchema = z.object({
  assetId: z.string().nonempty("O ativo é obrigatório."),
  currentValue: z
    .number({ invalid_type_error: "Informe um valor numérico válido." })
    .positive("O valor deve ser maior que zero."),
});
