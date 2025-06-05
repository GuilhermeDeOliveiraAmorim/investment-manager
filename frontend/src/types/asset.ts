export interface Asset {
  id: string;
  name: string;
}

export interface FindAllAssetsResponse {
  assets: Asset[];
}
