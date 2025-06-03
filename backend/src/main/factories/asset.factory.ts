import { PrismaAssetRepository } from "../../adapters/repositories/asset-repository";
import { CreateAssetUseCase } from "../../application/use-cases/create-asset-usecase";
import { FindAllAssetsUseCase } from "../../application/use-cases/find-all-assets-usecase";
import { prisma } from "../../config/prisma";

export type AssetUseCases = {
  create: CreateAssetUseCase;
  findAll: FindAllAssetsUseCase;
};

export function AssetFactory(): AssetUseCases {
  const assetRepository = new PrismaAssetRepository(prisma);
  const createAsset = new CreateAssetUseCase(assetRepository);
  const findAllAssets = new FindAllAssetsUseCase(assetRepository);

  return {
    create: createAsset,
    findAll: findAllAssets,
  };
}
