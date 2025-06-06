export interface Client {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

export interface CreateClientInput {
  name: string;
  email: string;
  status?: "active" | "inactive";
}

export interface UpdateClientInput {
  name: string;
  status: "active" | "inactive";
}

export interface FindAllClientsResponse {
  clients: Client[];
}

export interface FindClientByIdResponse {
  client: {
    id: string;
    name: string;
    status: "active" | "inactive";
    totalInvested: number;
  };
  allocations: Array<{
    id: string;
    assetId: string;
    assetName: string;
    currentValue: number;
    percentage: number;
  }>;
}
