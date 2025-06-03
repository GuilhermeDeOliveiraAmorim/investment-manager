import { PrismaClient } from "@prisma/client";
import { AssetRepository } from "../../domain/repositories/asset-repository";
import { Asset } from "../../domain/asset";

export class PrismaAssetRepository implements AssetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(asset: Asset): Promise<Asset> {
    const data = await this.prisma.asset.create({
      data: {
        id: asset.id,
        name: asset.name,
      },
    });

    return new Asset(data.id, data.name);
  }

  async findAll(): Promise<Asset[]> {
    const assets = await this.prisma.asset.findMany();

    return assets.map((asset) => new Asset(asset.id, asset.name));
  }
}
