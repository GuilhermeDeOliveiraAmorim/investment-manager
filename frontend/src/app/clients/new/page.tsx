"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@app/components/ui/button";
import { useCreateClient } from "@app/hooks/useClients";
import { Input } from "@app/components/ui/input";
import { CreateClientInput } from "@app/types/client";

export default function CreateClientPage() {
  const [form, setForm] = useState<CreateClientInput>({
    name: "",
    email: "",
    status: "active",
  });

  const {
    mutate: createClient,
    isPending,
    isSuccess,
    error,
  } = useCreateClient();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClient(form, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/clients");
        }, 2000);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Adicionar Cliente</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Ex: João da Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Ex: joao@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar Cliente"}
        </Button>

        {isSuccess && (
          <p className="text-green-600">Cliente criado com sucesso!</p>
        )}
        {error && <p className="text-red-600">Erro: {error.message}</p>}
      </form>
    </div>
  );
}
