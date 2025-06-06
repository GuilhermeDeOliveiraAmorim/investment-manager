"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@app/components/ui/button";
import { useCreateClient } from "@app/hooks/useClients";
import { Input } from "@app/components/ui/input";
import {
  CreateClientFormData,
  createClientSchema,
} from "@app/schemas/client-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Label } from "@app/components/ui/label";

export default function CreateClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientSchema),
  });

  const { mutate: createClient } = useCreateClient();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const onSubmit = (data: CreateClientFormData) => {
    createClient(data, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => router.push("/clients"), 2000);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Novo Cliente</CardTitle>
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
              <Label className="block text-sm font-medium">Email</Label>
              <Input placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium">Status</Label>
              <select
                {...register("status")}
                className="w-full border rounded px-3 py-2"
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
              <Button type="submit">Criar Cliente</Button>
            </CardFooter>
          </form>
        </CardContent>

        {success && (
          <CardFooter>
            <p className="text-green-600">
              Cliente criado com sucesso! Redirecionando...
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
