import { Asset } from "@app/types/asset";
import { apiClient } from "./apiClient";

export async function getAllAssets(): Promise<Asset[]> {
  const { data } = await apiClient.get<{ assets: Asset[] }>("/assets");
  return data.assets;
}
