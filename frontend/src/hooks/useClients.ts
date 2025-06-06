"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientService from "../services/clients";
import {
  Client,
  CreateClientInput,
  FindClientByIdResponse,
  UpdateClientInput,
} from "@app/types/client";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: clientService.getAllClients,
  });
}

export function useClient(id: string) {
  return useQuery<FindClientByIdResponse, Error>({
    queryKey: ["client", id],
    queryFn: () => clientService.getClientById(id),
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, CreateClientInput>({
    mutationFn: clientService.createClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, UpdateClientInput>({
    mutationFn: (input) => clientService.updateClient(id, input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["client", id] }),
  });
}
