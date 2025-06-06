"use client";

import { useAssets } from "@app/hooks/useAssets";

export default function AssetsPage() {
  const { data: assets, isLoading, error } = useAssets();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar ativos</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ativos</h1>
      <ul className="space-y-4">
        {assets?.map((asset) => (
          <li key={asset.id} className="border rounded-lg p-4 shadow-sm">
            <div className="font-semibold">{asset.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
