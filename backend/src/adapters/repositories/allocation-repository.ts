import { PrismaClient } from "@prisma/client";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { Allocation } from "../../domain/allocation";

export class PrismaAllocationRepository implements AllocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async find(allocationId: string): Promise<Allocation> {
    try {
      const allocation = await this.prisma.allocation.findUnique({
        where: { id: allocationId },
      });

      if (!allocation) {
        throw new Error(`Allocation with id ${allocationId} not found.`);
      }

      return new Allocation(
        allocation.id,
        allocation.clientId,
        allocation.assetId,
        allocation.currentValue
      );
    } catch (error) {
      throw error;
    }
  }

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

  async update(allocation: Allocation): Promise<Allocation> {
    try {
      const updated = await this.prisma.allocation.update({
        where: { id: allocation.id },
        data: {
          assetId: allocation.assetId,
          clientId: allocation.clientId,
          currentValue: allocation.currentValue,
        },
      });

      return new Allocation(
        updated.id,
        updated.assetId,
        updated.clientId,
        updated.currentValue
      );
    } catch (error) {
      throw error;
    }
  }
}
