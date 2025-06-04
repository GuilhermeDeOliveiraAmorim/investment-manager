import { Prisma } from "@prisma/client";
import { Client, ClientStatus } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
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

    try {
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
    } catch (error) {
      logger.error({
        code: "CREATE_CLIENT_ERROR",
        message: "Error creating client",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          email: input.email,
        },
      });

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ProblemDetail(
          "https://investment-manager.com/errors/client-duplicate",
          "Duplicate client",
          409,
          "Client with this email already exists",
          `/clients`,
          { email: input.email }
        );
      }

      throw new ProblemDetail(
        "https://investment-manager.com/errors/client-creation-failed",
        "Client creation failed",
        400,
        error instanceof Error ? error.message : String(error),
        `/clients`,
        { email: input.email }
      );
    }
  }
}
