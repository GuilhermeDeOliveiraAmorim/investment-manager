import { Client } from "../client";

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  update(client: Client): Promise<void>;
  findById(id: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
}
