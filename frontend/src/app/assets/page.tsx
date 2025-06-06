"use client";

import { useAssets } from "@app/hooks/useAssets";

export default function AssetsPage() {
  const { data: assets, isLoading, error } = useAssets();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar ativos</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ativos</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assets?.map((asset) => (
          <li
            key={asset.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="font-semibold">{asset.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
