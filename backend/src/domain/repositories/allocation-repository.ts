import { Allocation } from "../allocation";

export interface AllocationRepository {
  create(allocation: Allocation): Promise<Allocation>;
  findByClientId(clientId: string): Promise<Allocation[]>;
  deleteByClientId(clientId: string): Promise<void>;
}
