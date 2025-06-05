import { Prisma } from "@prisma/client";
import { Asset } from "../../domain/asset";
import { AssetRepository } from "../../domain/repositories/asset-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

export type CreateAssetInputDTO = {
  name: string;
};

export type CreateAssetOutputDTO = {
  asset: Asset;
};

export class CreateAssetUseCase {
  constructor(private readonly assetRepository: AssetRepository) {}

  async execute(input: CreateAssetInputDTO): Promise<CreateAssetOutputDTO> {
    logger.info({
      code: "CREATE_ASSET",
      message: "Creating a new asset",
      layer: "usecase",
      meta: { timestamp: new Date().toISOString() },
    });

    try {
      const asset = Asset.create(input.name);

      const output: CreateAssetOutputDTO = {
        asset: await this.assetRepository.create(asset),
      };

      logger.info({
        code: "CREATE_ASSET_SUCCESS",
        message: "Asset created successfully",
        layer: "usecase",
        meta: {
          assetId: output.asset.id,
          timestamp: new Date().toISOString(),
        },
      });

      return output;
    } catch (error) {
      logger.error({
        code: "CREATE_ASSET_ERROR",
        message: "Error creating asset",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          name: input.name,
        },
      });

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ProblemDetail(
          "https://investment-manager.com/errors/asset-duplicate",
          "O ativo já existe",
          409,
          "O ativo com este nome já existe",
          `/assets/${input.name}`,
          { name: input.name }
        );
      }

      throw new ProblemDetail(
        "https://investment-manager.com/errors/asset-creation-failed",
        "Falha na criação do ativo",
        500,
        error instanceof Error ? error.message : String(error),
        `/assets`,
        { name: input.name }
      );
    }
  }
}
