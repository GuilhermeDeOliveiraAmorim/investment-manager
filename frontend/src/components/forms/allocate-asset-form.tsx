"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAssets } from "@app/hooks/useAssets";
import { createAllocationSchema } from "@app/schemas/allocation-schema";
import { useCreateAllocation } from "@app/hooks/useAllocations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AllocateAssetFormProps = {
  clientId: string;
  onAllocated: () => void;
};

type AllocationFormData = z.infer<typeof createAllocationSchema>;

export function AllocateAssetForm({
  clientId,
  onAllocated,
}: AllocateAssetFormProps) {
  const { data: assets = [] } = useAssets();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AllocationFormData>({
    resolver: zodResolver(createAllocationSchema),
  });

  const { mutate, isPending } = useCreateAllocation(clientId);

  const onSubmit = (data: AllocationFormData) => {
    mutate(
      { ...data, clientId },
      {
        onSuccess: () => {
          toast("Ativo alocado com sucesso!");
          reset();
          onAllocated();
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ detail: string }>;
            const detail = axiosError.response?.data?.detail;

            toast("Erro ao alocar ativo: " + detail);
          } else {
            toast("Erro inesperado: " + (error as Error).message);
          }
        },
      }
    );
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Novo Ativo</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para alocar um ativo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Ativo</Label>
            <select
              {...register("assetId")}
              className="w-full border rounded p-2"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um ativo
              </option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </select>
            {errors.assetId && (
              <p className="text-sm text-red-500">{errors.assetId.message}</p>
            )}
          </div>

          <div>
            <Label>Valor inicial (R$)</Label>
            <Input
              type="number"
              step="0.01"
              {...register("currentValue", { valueAsNumber: true })}
              className="w-full border rounded p-2"
              placeholder="0.00"
            />
            {errors.currentValue && (
              <p className="text-sm text-red-500">
                {errors.currentValue.message}
              </p>
            )}
          </div>

          <CardFooter className="p-0">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Alocando..." : "Alocar ativo"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
