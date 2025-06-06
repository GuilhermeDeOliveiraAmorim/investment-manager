"use client";

import { useParams } from "next/navigation";
import { useClient } from "@app/hooks/useClients";

export default function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useClient(id);

  if (isLoading) return <p>Carregando...</p>;
  if (error || !data) return <p>Erro ao buscar cliente</p>;

  const { client, allocations } = data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{client.name}</h1>
      <p>
        <strong>Total investido:</strong> R${" "}
        {client.totalInvested.toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-4">Alocações</h2>
      <ul className="space-y-2">
        {allocations.map((a) => (
          <li key={a.id} className="border p-4 rounded">
            <div className="font-medium">{a.assetName}</div>
            <div className="text-sm text-muted-foreground">
              Valor: R$ {a.currentValue.toLocaleString()} — {a.percentage}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
