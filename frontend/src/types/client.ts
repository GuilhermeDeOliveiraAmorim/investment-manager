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
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

export interface FindAllClientsResponse {
  clients: Client[];
}

export interface FindClientByIdResponse {
  client: {
    id: string;
    name: string;
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
