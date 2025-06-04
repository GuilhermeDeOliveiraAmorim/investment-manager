import { PrismaClient } from "@prisma/client";
import { AssetRepository } from "../../domain/repositories/asset-repository";
import { Asset } from "../../domain/asset";

export class PrismaAssetRepository implements AssetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(asset: Asset): Promise<Asset> {
    try {
      const data = await this.prisma.asset.create({
        data: {
          id: asset.id,
          name: asset.name,
        },
      });

      return new Asset(data.id, data.name);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Asset[]> {
    try {
      const assets = await this.prisma.asset.findMany();

      return assets.map((asset) => new Asset(asset.id, asset.name));
    } catch (error) {
      throw error;
    }
  }
}
