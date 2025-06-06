// components/forms/update-allocation-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateAllocation } from "@app/hooks/useAllocations";
import { Button } from "../ui/button";
import { updateAllocationSchema } from "@app/schemas/allocation-schema";

type FormValues = z.infer<typeof updateAllocationSchema>;

interface Props {
  clientId: string;
  allocationId: string;
  initialValue: number;
}

export function UpdateAllocationForm({
  clientId,
  allocationId,
  initialValue,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { currentValue: initialValue },
    resolver: zodResolver(updateAllocationSchema),
  });

  const mutation = useUpdateAllocation(clientId);

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync({
      allocationId,
      currentValue: values.currentValue,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-sm">Novo valor (R$)</span>
        <input
          type="number"
          step="0.01"
          {...register("currentValue", { valueAsNumber: true })}
          className="input w-full"
        />
        {errors.currentValue && (
          <p className="text-red-500 text-xs mt-1">
            {errors.currentValue.message}
          </p>
        )}
      </label>

      <Button type="submit" disabled={isSubmitting}>
        Salvar
      </Button>
    </form>
  );
}
