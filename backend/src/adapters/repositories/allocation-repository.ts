import { PrismaClient } from "@prisma/client";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { Allocation } from "../../domain/allocation";

export class PrismaAllocationRepository implements AllocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(allocation: Allocation): Promise<Allocation> {
    try {
      const created = await this.prisma.allocation.create({
        data: {
          id: allocation.id,
          clientId: allocation.clientId,
          assetId: allocation.assetId,
          currentValue: allocation.currentValue,
        },
      });

      return new Allocation(
        created.id,
        created.clientId,
        created.assetId,
        created.currentValue
      );
    } catch (error) {
      throw error;
    }
  }

  async findByClientId(clientId: string): Promise<Allocation[]> {
    try {
      const allocations = await this.prisma.allocation.findMany({
        where: { clientId },
      });

      return allocations.map(
        (a) => new Allocation(a.id, a.clientId, a.assetId, a.currentValue)
      );
    } catch (error) {
      throw error;
    }
  }
}
