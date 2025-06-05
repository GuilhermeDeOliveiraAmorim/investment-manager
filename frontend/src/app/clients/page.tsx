"use client";

import { Button } from "@app/components/ui/button";
import { useClients } from "../../hooks/useClients";

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients</p>;

  return (
    <div>
      <h1>Clients</h1>
      <Button>Add Client</Button>
      <ul>
        {clients?.map((client) => (
          <li key={client.id}>
            <a href={`/clients/${client.id}`}>
              {client.name} ({client.status})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
