import { Client } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { logger } from "../../infra/http/logger";

export type FindClientByIdInputDTO = {
  id: string;
};

export type FindClientByIdOutputDTO = {
  client: Client | null;
};

export class FindClientByIdUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

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
    };

    if (!output.client) {
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
