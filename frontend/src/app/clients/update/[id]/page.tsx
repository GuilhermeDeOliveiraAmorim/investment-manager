"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";

import {
  UpdateClientFormData,
  updateClientSchema,
} from "@app/schemas/client-schema";

import { useUpdateClient, useClient } from "@app/hooks/useClients";

export default function UpdateClientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const { data: client, isLoading } = useClient(id);

  const { mutate: updateClient, isPending: isUpdating } = useUpdateClient(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateClientFormData>({
    resolver: zodResolver(updateClientSchema),
  });

  useEffect(() => {
    if (client) {
      reset({
        name: client.client.name,
        status: client.client.status ? "active" : "inactive",
      });
    }
  }, [client, reset]);

  const onSubmit = (data: UpdateClientFormData) => {
    updateClient(
      {
        name: data.name,
        status: data.status,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => router.push(`/clients/${id}`), 2000);
        },
      }
    );
  };

  if (isLoading) {
    return <p>Carregando cliente...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Editar Cliente</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium">Nome</Label>
              <Input placeholder="Nome" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium">Status</Label>
              <select
                {...register("status")}
                className="w-full border rounded px-3 py-2"
                defaultValue=""
              >
                <option value="">Selecione o status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <CardFooter className="p-0">
              <Button type="submit" disabled={isUpdating}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </form>
        </CardContent>

        {success && (
          <CardFooter>
            <p className="text-green-600">
              Cliente atualizado com sucesso! Redirecionando...
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
