import { Allocation } from "../../domain/allocation";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

export type UpdateAllocationInputDTO = {
  allocationId: string;
  currentValue: number;
};

export type UpdateAllocationOutputDTO = {
  allocation: Allocation;
};

export class UpdateAllocationUseCase {
  constructor(private readonly allocationRepository: AllocationRepository) {}

  async execute(
    input: UpdateAllocationInputDTO
  ): Promise<UpdateAllocationOutputDTO> {
    logger.info({
      code: "UPDATE_ALLOCATION",
      message: "Updating allocation",
      layer: "usecase",
      meta: {
        allocationId: input.allocationId,
        timestamp: new Date().toISOString(),
      },
    });

    try {
      const allocation = await this.allocationRepository.find(input.allocationId);

      if (!allocation) {
        logger.warn({
          code: "ALLOCATION_NOT_FOUND",
          message: "Allocation not found",
          layer: "usecase",
          meta: {
            allocationId: input.allocationId,
            timestamp: new Date().toISOString(),
          },
        });

        throw new ProblemDetail(
          "https://investment-manager.com/errors/allocation-not-found",
          "Alocação não encontrada",
          404,
          `Alocação com ID ${input.allocationId} não encontrada`,
          `/allocations/${input.allocationId}`
        );
      }

      allocation.update(input.currentValue);

      const output: UpdateAllocationOutputDTO = {
        allocation: await this.allocationRepository.update(allocation),
      };

      logger.info({
        code: "UPDATE_ALLOCATION_SUCCESS",
        message: "Allocation updated successfully",
        layer: "usecase",
        meta: {
          allocationId: output.allocation.id,
          timestamp: new Date().toISOString(),
        },
      });

      return output;
    } catch (error) {
      logger.error({
        code: "UPDATE_ALLOCATION_ERROR",
        message: "Failed to update allocation",
        layer: "usecase",
        meta: {
          allocationId: input.allocationId,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      });

      throw new ProblemDetail(
        "https://investment-manager.com/errors/allocation-update-failed",
        "Erro ao atualizar a alocação",
        500,
        error instanceof Error ? error.message : "Erro desconhecido",
        `/allocations/${input.allocationId}`
      );
    }
  }
}
