export type ClientStatus = "active" | "inactive";

export class Client {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public status: ClientStatus = "active"
  ) {}

  update(name: string, email: string, status: ClientStatus) {
    this.name = name;
    this.email = email;
    this.status = status;
  }
}
