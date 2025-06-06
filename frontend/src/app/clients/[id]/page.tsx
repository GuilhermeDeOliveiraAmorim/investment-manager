"use client";

import { useParams } from "next/navigation";
import { useClient } from "@app/hooks/useClients";
import { AllocateAssetForm } from "@app/components/forms/allocate-asset-form";
import { UpdateAllocationForm } from "@app/components/forms/update-allocation-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import Link from "next/link";
import { Button } from "@app/components/ui/button";

export default function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useClient(id);

  if (isLoading) return <p>Carregando...</p>;
  if (error || !data) return <p>Erro ao buscar cliente</p>;

  const { client, allocations } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{client.name}</h1>

        <Link href={`/clients/update/${client.id}`}>
          <Button>Editar Cliente</Button>
        </Link>
      </div>
      <p>
        <strong>Total investido:</strong> R${" "}
        {client.totalInvested.toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-4">Alocações</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allocations.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <CardTitle>{a.assetName}</CardTitle>
              <CardDescription>
                Valor: R$ {a.currentValue.toLocaleString()} — {a.percentage}%
              </CardDescription>
            </CardHeader>

            <UpdateAllocationForm clientId={id} allocationId={a.id} />
          </Card>
        ))}
      </div>

      <AllocateAssetForm clientId={client.id} onAllocated={() => {}} />
    </div>
  );
}
