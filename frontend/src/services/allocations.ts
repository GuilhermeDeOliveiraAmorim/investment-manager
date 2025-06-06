import { Allocation, CreateAllocationInput } from "@app/types/allocation";
import { apiClient } from "./apiClient";

export async function createAllocation(
  input: CreateAllocationInput
): Promise<Allocation> {
  const { data } = await apiClient.post<Allocation>("/allocations", input);
  return data;
}
