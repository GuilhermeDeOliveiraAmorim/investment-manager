import { Asset } from "../../domain/asset";
import { AssetRepository } from "../../domain/repositories/asset-repository";
import { ProblemDetail } from "../../exceptions/problem.detail.error";
import { logger } from "../../infra/logger";

export type FindAllAssetsOutputDTO = {
  assets: Asset[];
};

export class FindAllAssetsUseCase {
  constructor(private readonly assetRepository: AssetRepository) {}

  async execute(): Promise<FindAllAssetsOutputDTO> {
    logger.info({
      code: "FIND_ALL_ASSETS",
      message: "Fetching all assets",
      layer: "usecase",
      meta: { timestamp: new Date().toISOString() },
    });

    try {
      const output: FindAllAssetsOutputDTO = {
        assets: await this.assetRepository.findAll(),
      };

      if (output.assets.length === 0) {
        logger.warn({
          code: "NO_ASSETS_FOUND",
          message: "No assets found",
          layer: "usecase",
          meta: { timestamp: new Date().toISOString() },
        });
        return { assets: [] };
      }

      logger.info({
        code: "FIND_ALL_ASSETS_SUCCESS",
        message: "Assets fetched successfully",
        layer: "usecase",
        meta: {
          count: output.assets.length,
          timestamp: new Date().toISOString(),
        },
      });

      return output;
    } catch (error) {
      logger.error({
        code: "FIND_ALL_ASSETS_ERROR",
        message: "Error fetching assets",
        layer: "usecase",
        meta: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      });

      throw new ProblemDetail(
        "https://investment-manager.com/errors/asset-fetch-failed",
        "Falha ao buscar ativos",
        500,
        error instanceof Error
          ? error.message
          : "Erro interno ao consultar ativos",
        "/assets"
      );
    }
  }
}
