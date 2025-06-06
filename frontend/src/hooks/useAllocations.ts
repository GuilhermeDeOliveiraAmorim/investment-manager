import { Allocation, CreateAllocationInput } from "@app/types/allocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientService from "../services/allocations";

export function useCreateAllocation() {
  const queryAllocations = useQueryClient();
  return useMutation<Allocation, Error, CreateAllocationInput>({
    mutationFn: clientService.createAllocation,
    onSuccess: () =>
      queryAllocations.invalidateQueries({ queryKey: ["allocations"] }),
  });
}
