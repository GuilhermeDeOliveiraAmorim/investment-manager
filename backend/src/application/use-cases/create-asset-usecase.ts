import { Asset } from "../../domain/asset";
import { AssetRepository } from "../../domain/repositories/asset-repository";
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
  }
}
