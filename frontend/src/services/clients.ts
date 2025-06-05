import { apiClient } from "./apiClient";
import type {
  CreateClientInput,
  UpdateClientInput,
  Client,
} from "../types/client";

export async function getAllClients(): Promise<Client[]> {
  const { data } = await apiClient.get<{ clients: Client[] }>("/clients");
  return data.clients;
}

export async function getClientById(id: string): Promise<Client> {
  const { data } = await apiClient.get<{ client: Client }>(`/clients/${id}`);
  return data.client;
}

export async function createClient(input: CreateClientInput): Promise<Client> {
  const { data } = await apiClient.post<Client>("/clients", input);
  return data;
}

export async function updateClient(
  id: string,
  input: UpdateClientInput
): Promise<Client> {
  const { data } = await apiClient.put<Client>(`/clients/${id}`, input);
  return data;
}
