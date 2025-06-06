import {
  Allocation,
  CreateAllocationInput,
  UpdateAllocationInput,
} from "@app/types/allocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientService from "../services/allocations";

export function useCreateAllocation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation<Allocation, Error, CreateAllocationInput>({
    mutationFn: clientService.createAllocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
    },
  });
}

export function useUpdateAllocation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation<Allocation, Error, UpdateAllocationInput>({
    mutationFn: (input) =>
      clientService.updateAllocation(input.allocationId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
    },
  });
}
