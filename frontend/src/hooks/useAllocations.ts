import { Allocation, CreateAllocationInput } from "@app/types/allocation";
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
