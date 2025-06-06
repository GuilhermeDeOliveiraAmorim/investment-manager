import {
  Allocation,
  CreateAllocationInput,
  UpdateAllocationInput,
} from "@app/types/allocation";
import { apiClient } from "./apiClient";

export async function createAllocation(
  input: CreateAllocationInput
): Promise<Allocation> {
  const { data } = await apiClient.post<Allocation>("/allocations", input);
  return data;
}

export async function updateAllocation(
  id: string,
  input: UpdateAllocationInput
): Promise<Allocation> {
  const { data } = await apiClient.put<Allocation>(`/allocations`, input);
  return data;
}
