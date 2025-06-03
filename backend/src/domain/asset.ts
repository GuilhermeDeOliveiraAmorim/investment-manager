export class Asset {
  constructor(public readonly id: string, public name: string) {}

  static create(name: string): Asset {
    return new Asset(crypto.randomUUID(), name);
  }
}
