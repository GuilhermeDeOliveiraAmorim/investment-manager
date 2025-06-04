import { Client } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

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

    try {
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
    } catch (error) {
      logger.error({
        code: "FIND_ALL_CLIENTS_ERROR",
        message: "Error while listing clients",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      });

      throw new ProblemDetail(
        "https://investment-manager.com/errors/client-fetch-failed",
        "Erro ao listar clientes",
        500,
        error instanceof Error
          ? error.message
          : "Erro interno ao consultar clientes",
        "/clients"
      );
    }
  }
}
