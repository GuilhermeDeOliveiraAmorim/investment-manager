import { Allocation } from "../../domain/allocation";
import { Client } from "../../domain/client";
import { AllocationRepository } from "../../domain/repositories/allocation-repository";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { logger } from "../../infra/http/logger";

export type FindClientByIdInputDTO = {
  id: string;
};

export type FindClientByIdOutputDTO = {
  client: Client | null;
  allocations?: Allocation[];
};

export class FindClientByIdUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly allocationRepository: AllocationRepository
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

    const output: FindClientByIdOutputDTO = {
      client: await this.clientRepository.findById(input.id),
      allocations: await this.allocationRepository.findByClientId(input.id),
    };

    if (!output.client && !output.allocations?.length) {
      logger.warn({
        code: "FIND_CLIENT_BY_ID_NOT_FOUND",
        message: `Client not found with id: ${input.id}`,
        layer: "usecase",
        meta: { timestamp: new Date().toISOString() },
      });
    } else {
      logger.info({
        code: "FIND_CLIENT_BY_ID_SUCCESS",
        message: `Client found with id: ${input.id}`,
        layer: "usecase",
        meta: { timestamp: new Date().toISOString() },
      });
    }

    return output;
  }
}
