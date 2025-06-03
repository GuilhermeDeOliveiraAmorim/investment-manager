import { Client, ClientStatus } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { logger } from "../../infra/http/logger";

export type UpdateClientInputDTO = {
  id: string;
  name: string;
  email: string;
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

      throw new Error("Client not found");
    }

    client.update(input.name, input.email, input.status);

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
  }
}
