export class Allocation {
  constructor(
    public readonly clientId: string,
    public readonly assetId: string,
    public percentage: number
  ) {}
}
