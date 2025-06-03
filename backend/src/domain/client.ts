export type ClientStatus = "active" | "inactive";

export class Client {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public status: ClientStatus = "active"
  ) {}

  static create(name: string, email: string, status: ClientStatus): Client {
    return new Client(crypto.randomUUID(), name, email, status);
  }

  update(name: string, email: string, status: ClientStatus) {
    this.name = name;
    this.email = email;
    this.status = status;
  }
}
