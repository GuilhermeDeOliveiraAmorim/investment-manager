import { Allocation } from "../allocation";

export interface AllocationRepository {
  create(allocation: Allocation): Promise<Allocation>;
  findByClientId(clientId: string): Promise<Allocation[]>;
  update(allocation: Allocation): Promise<Allocation>;
}
