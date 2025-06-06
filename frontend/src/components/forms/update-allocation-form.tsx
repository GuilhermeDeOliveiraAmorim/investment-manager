// components/forms/update-allocation-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateAllocation } from "@app/hooks/useAllocations";
import { Button } from "../ui/button";
import { updateAllocationSchema } from "@app/schemas/allocation-schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";

type FormValues = z.infer<typeof updateAllocationSchema>;

interface Props {
  clientId: string;
  allocationId: string;
}

export function UpdateAllocationForm({ clientId, allocationId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(updateAllocationSchema),
  });

  const mutation = useUpdateAllocation(clientId);

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync({
      allocationId,
      currentValue: values.currentValue,
    });

    reset();
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div>
          <Label>Adicionar valor (R$)</Label>
          <Input
            type="number"
            step="0.01"
            {...register("currentValue", { valueAsNumber: true })}
            className="input w-full border rounded p-2"
            placeholder="0.00"
          />
          {errors.currentValue && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentValue.message}
            </p>
          )}
        </div>

        <CardFooter className="p-0">
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </CardFooter>
      </form>
    </CardContent>
  );
}
