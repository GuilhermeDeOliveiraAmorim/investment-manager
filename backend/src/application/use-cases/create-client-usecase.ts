import { Client, ClientStatus } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { logger } from "../../infra/logger";

export type CreateClientInputDTO = {
  name: string;
  email: string;
  status?: ClientStatus;
};

export type CreateClientOutputDTO = {
  client: Client;
};

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(input: CreateClientInputDTO): Promise<CreateClientOutputDTO> {
    logger.info({
      code: "CREATE_CLIENT",
      message: "Creating a new client",
      layer: "usecase",
      meta: { timestamp: new Date().toISOString() },
    });

    const client = Client.create(
      input.name,
      input.email,
      input.status ?? "active"
    );

    const output: CreateClientOutputDTO = {
      client: await this.clientRepository.create(client),
    };

    logger.info({
      code: "CREATE_CLIENT_SUCCESS",
      message: "Client created successfully",
      layer: "usecase",
      meta: {
        clientId: output.client.id,
        timestamp: new Date().toISOString(),
      },
    });

    return output;
  }
}
