import { Asset } from "../asset";

export interface AssetRepository {
  create(asset: Asset): Promise<Asset>;
  findAll(): Promise<Asset[]>;
}
