import { Prisma } from "@prisma/client";
import { Allocation } from "../../domain/allocation";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

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

    try {
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
    } catch (error) {
      logger.error({
        code: "CREATE_ALLOCATION_ERROR",
        message: "Error creating allocation",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          clientId: input.clientId,
          assetId: input.assetId,
        },
      });

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ProblemDetail(
          "https://investment-manager.com/errors/allocation-duplicate",
          "Alocação duplicada",
          409,
          "Já existe uma alocação para este cliente e ativo.",
          `/allocations/${input.clientId}/${input.assetId}`,
          {
            clientId: input.clientId,
            assetId: input.assetId,
          }
        );
      }

      throw new ProblemDetail(
        "https://investment-manager.com/errors/allocation-creation-failed",
        "Allocation creation failed",
        400,
        error instanceof Error ? error.message : String(error),
        `/allocations/${input.clientId}/${input.assetId}`,
        {
          clientId: input.clientId,
          assetId: input.assetId,
        }
      );
    }
  }
}
