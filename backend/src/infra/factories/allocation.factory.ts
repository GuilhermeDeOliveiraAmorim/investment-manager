import { PrismaAllocationRepository } from "../../adapters/repositories/allocation-repository";
import { CreateAllocationUseCase } from "../../application/use-cases/create-allocation-usecase";
import { UpdateAllocationUseCase } from "../../application/use-cases/update-allocation-usecase";
import { prisma } from "../../config/prisma";

export type AllocationUseCases = {
  create: CreateAllocationUseCase;
  update: UpdateAllocationUseCase;
};

export function AllocationFactory(): AllocationUseCases {
  const allocationRepository = new PrismaAllocationRepository(prisma);

  const create = new CreateAllocationUseCase(allocationRepository);
  const update = new UpdateAllocationUseCase(allocationRepository);

  return {
    create: create,
    update: update,
  };
}
