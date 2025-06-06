import Link from "next/link";

type Client = {
  id: string;
  name: string;
  status: string;
};

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:bg-muted cursor-pointer">
        <h2 className="text-lg font-semibold">{client.name}</h2>
        <p className="text-sm text-muted-foreground">
          {client.status ? "Active" : "Inactive"}
        </p>
      </div>
    </Link>
  );
}
