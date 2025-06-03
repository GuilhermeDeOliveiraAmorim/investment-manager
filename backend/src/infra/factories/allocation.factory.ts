import { PrismaAllocationRepository } from "../../adapters/repositories/allocation-repository";
import { CreateAllocationUseCase } from "../../application/use-cases/create-allocation-usecase";
import { prisma } from "../../config/prisma";

export type AllocationUseCases = {
  create: CreateAllocationUseCase;
};

export function AllocationFactory(): AllocationUseCases {
  const assetRepository = new PrismaAllocationRepository(prisma);
  
  const create = new CreateAllocationUseCase(assetRepository);

  return {
    create: create,
  };
}
