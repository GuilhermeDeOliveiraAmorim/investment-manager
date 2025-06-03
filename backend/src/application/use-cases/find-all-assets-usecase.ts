import { Asset } from "../../domain/asset";
import { AssetRepository } from "../../domain/repositories/asset-repository";
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
  }
}
