import { Client, ClientStatus } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

export type UpdateClientInputDTO = {
  id: string;
  name: string;
  status: ClientStatus;
};

export type UpdateClientOutputDTO = {
  client: Client;
};

export class UpdateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(input: UpdateClientInputDTO): Promise<UpdateClientOutputDTO> {
    logger.info({
      code: "UPDATE_CLIENT",
      message: "Updating client",
      layer: "usecase",
      meta: {
        clientId: input.id,
        timestamp: new Date().toISOString(),
      },
    });

    try {
      const client = await this.clientRepository.findById(input.id);

      if (!client) {
        logger.warn({
          code: "CLIENT_NOT_FOUND",
          message: "Client not found",
          layer: "usecase",
          meta: {
            clientId: input.id,
            timestamp: new Date().toISOString(),
          },
        });

        throw new ProblemDetail(
          "https://investment-manager.com/errors/client-not-found",
          "Cliente não encontrado",
          404,
          `Cliente com ID ${input.id} não foi encontrado`,
          `/clients/${input.id}`
        );
      }

      client.update(input.name, input.status);

      const output: UpdateClientOutputDTO = {
        client: await this.clientRepository.update(client),
      };

      logger.info({
        code: "UPDATE_CLIENT_SUCCESS",
        message: "Client updated successfully",
        layer: "usecase",
        meta: {
          clientId: output.client.id,
          timestamp: new Date().toISOString(),
        },
      });

      return output;
    } catch (error) {
      logger.error({
        code: "UPDATE_CLIENT_ERROR",
        message: "Failed to update client",
        layer: "usecase",
        meta: {
          clientId: input.id,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      });

      throw new ProblemDetail(
        "https://investment-manager.com/errors/client-update-failed",
        "Erro ao atualizar cliente",
        500,
        error instanceof Error ? error.message : "Erro desconhecido",
        `/clients/${input.id}`
      );
    }
  }
}
