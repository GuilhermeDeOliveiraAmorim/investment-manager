"use client";

import { Button } from "@app/components/ui/button";
import { useClients } from "../../hooks/useClients";
import { ClientCard } from "@app/components/ui/client-card";
import Link from "next/link";

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar clientes</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/clients/new">
          <Button>Adicionar Cliente</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
