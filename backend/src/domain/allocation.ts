export class Allocation {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly assetId: string,
    public currentValue: number
  ) {}

  static create(
    clientId: string,
    assetId: string,
    currentValue: number
  ): Allocation {
    return new Allocation(crypto.randomUUID(), clientId, assetId, currentValue);
  }
}
