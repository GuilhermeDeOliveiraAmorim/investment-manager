import { Allocation } from "../../domain/allocation";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { logger } from "../../infra/http/logger";

export type CreateAllocationInputDTO = {
  clientId: string;
  assetId: string;
  currentValue: number;
};

export type CreateAllocationOutputDTO = {
  allocation: Allocation;
};

export class CreateAllocationUseCase {
  constructor(private readonly allocationRepository: AllocationRepository) {}

  async execute(
    input: CreateAllocationInputDTO
  ): Promise<CreateAllocationOutputDTO> {
    logger.info({
      code: "CREATE_ALLOCATION",
      message: "Creating a new allocation",
      layer: "usecase",
      meta: {
        timestamp: new Date().toISOString(),
        clientId: input.clientId,
        assetId: input.assetId,
      },
    });

    const allocation = Allocation.create(
      input.clientId,
      input.assetId,
      input.currentValue
    );

    const output: CreateAllocationOutputDTO = {
      allocation: await this.allocationRepository.create(allocation),
    };

    logger.info({
      code: "CREATE_ALLOCATION_SUCCESS",
      message: "Allocation created successfully",
      layer: "usecase",
      meta: { allocation, timestamp: new Date().toISOString() },
    });

    return output;
  }
}
