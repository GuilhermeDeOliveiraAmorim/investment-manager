import { PrismaAllocationRepository } from "../../adapters/repositories/allocation-repository";
import { PrismaAssetRepository } from "../../adapters/repositories/asset-repository";
import { PrismaClientRepository } from "../../adapters/repositories/client-repository";
import { CreateClientUseCase } from "../../application/use-cases/create-client-usecase";
import { FindAllClientsUseCase } from "../../application/use-cases/find-all-clients-usecase";
import { FindClientByIdUseCase } from "../../application/use-cases/find-client-by-id-usecase";
import { UpdateClientUseCase } from "../../application/use-cases/update-client-usecase";
import { prisma } from "../../config/prisma";

export type ClientUseCases = {
  create: CreateClientUseCase;
  findAll: FindAllClientsUseCase;
  findById: FindClientByIdUseCase;
  update: UpdateClientUseCase;
};

export function ClientFactory(): ClientUseCases {
  const clientRepository = new PrismaClientRepository(prisma);
  const allocationRepository = new PrismaAllocationRepository(prisma);
  const assetRepository = new PrismaAssetRepository(prisma);

  const create = new CreateClientUseCase(clientRepository);
  const findAll = new FindAllClientsUseCase(clientRepository);
  const findById = new FindClientByIdUseCase(
    clientRepository,
    allocationRepository,
    assetRepository
  );
  const update = new UpdateClientUseCase(clientRepository);

  return {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
  };
}
