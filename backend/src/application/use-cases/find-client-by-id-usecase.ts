import { Allocation } from "../../domain/allocation";
import { Asset } from "../../domain/asset";
import { Client } from "../../domain/client";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { AssetRepository } from "../../domain/repositories/asset-repository";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

export type ClientOutputDTO = {
  id: string;
  name: string;
  totalInvested?: number;
};

export type AllocationsOutputDTO = {
  id: string;
  assetId: string;
  assetName: string;
  currentValue: number;
};

export type FindClientByIdInputDTO = {
  id: string;
};

export type FindClientByIdOutputDTO = {
  client: ClientOutputDTO | null;
  allocations: AllocationsOutputDTO[] | [];
};

export class FindClientByIdUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly allocationRepository: AllocationRepository,
    private readonly assetRepository: AssetRepository
  ) {}

  async execute(
    input: FindClientByIdInputDTO
  ): Promise<FindClientByIdOutputDTO> {
    logger.info({
      code: "FIND_CLIENT_BY_ID",
      message: `Searching client with id: ${input.id}`,
      layer: "usecase",
      meta: { timestamp: new Date().toISOString() },
    });

    try {
      const client = await this.clientRepository.findById(input.id);

      if (!client) {
        logger.warn({
          code: "FIND_CLIENT_BY_ID_NOT_FOUND",
          message: `Client not found with id: ${input.id}`,
          layer: "usecase",
          meta: { timestamp: new Date().toISOString() },
        });

        throw new ProblemDetail(
          "https://investment-manager.com/errors/client-not-found",
          "Cliente não encontrado",
          404,
          `Cliente com ID ${input.id} não foi encontrado`,
          `/clients/${input.id}`
        );
      }

      const clientAllocations = await this.allocationRepository.findByClientId(
        input.id
      );

      if (!clientAllocations || clientAllocations.length === 0) {
        logger.warn({
          code: "FIND_CLIENT_BY_ID_NO_ALLOCATIONS",
          message: `No allocations found for client with id: ${input.id}`,
          layer: "usecase",
          meta: { timestamp: new Date().toISOString() },
        });

        const output: FindClientByIdOutputDTO = {
          client: {
            id: client.id,
            name: client.name,
            totalInvested: 0,
          },
          allocations: [],
        };

        return output;
      }

      const allocations: AllocationsOutputDTO[] = [];
      let totalInvested: number = 0;

      for (const clientAllocation of clientAllocations) {
        const asset = await this.assetRepository.findById(
          clientAllocation.assetId
        );

        if (asset) {
          allocations.push({
            id: clientAllocation.id,
            assetId: asset.id,
            assetName: asset.name,
            currentValue: clientAllocation.currentValue,
          });

          totalInvested += clientAllocation.currentValue;
        } else {
          logger.warn({
            code: "FIND_CLIENT_BY_ID_ASSET_NOT_FOUND",
            message: `Asset not found for allocation id: ${clientAllocation.id}`,
            layer: "usecase",
            meta: {
              allocationId: clientAllocation.id,
              timestamp: new Date().toISOString(),
            },
          });
        }
      }

      const output: FindClientByIdOutputDTO = {
        client: {
          id: client.id,
          name: client.name,
          totalInvested: totalInvested,
        },
        allocations: allocations,
      };

      logger.info({
        code: "FIND_CLIENT_BY_ID_SUCCESS",
        message: `Client found with id: ${input.id}`,
        layer: "usecase",
        meta: { timestamp: new Date().toISOString() },
      });

      return output;
    } catch (error) {
      logger.error({
        code: "FIND_CLIENT_BY_ID_ERROR",
        message: "Error fetching client and allocations",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      });

      throw new ProblemDetail(
        "https://investment-manager.com/errors/client-fetch-failed",
        "Erro ao buscar cliente",
        500,
        error instanceof Error
          ? error.message
          : "Erro interno ao buscar cliente",
        `/clients/${input.id}`
      );
    }
  }
}
