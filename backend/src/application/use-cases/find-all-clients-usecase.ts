import { Client } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { logger } from "../../infra/http/logger";

export type FindAllClientsOutputDTO = {
  clients: Client[];
};

export class FindAllClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<FindAllClientsOutputDTO> {
    logger.info({
      code: "FIND_ALL_CLIENTS",
      message: "Listing all clients",
      layer: "usecase",
      meta: { timestamp: new Date().toISOString() },
    });

    const output: FindAllClientsOutputDTO = {
      clients: await this.clientRepository.findAll(),
    };

    if (output.clients.length === 0) {
      logger.warn({
        code: "NO_CLIENTS_FOUND",
        message: "No clients found",
        layer: "usecase",
        meta: { timestamp: new Date().toISOString() },
      });
      return { clients: [] };
    }

    logger.info({
      code: "FIND_ALL_CLIENTS_SUCCESS",
      message: `${output.clients.length} client(s) found`,
      layer: "usecase",
      meta: {
        total: output.clients.length,
        timestamp: new Date().toISOString(),
      },
    });

    return output;
  }
}
