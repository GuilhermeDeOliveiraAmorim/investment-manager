import { Asset } from "../asset";

export interface AssetRepository {
  findAll(): Promise<Asset[]>;
}
