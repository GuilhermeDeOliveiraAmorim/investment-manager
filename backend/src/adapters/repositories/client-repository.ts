import { PrismaClient } from "@prisma/client";
import { Client } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";

export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(client: Client): Promise<Client> {
    const created = await this.prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        email: client.email,
        status: client.status === "active",
      },
    });

    return new Client(
      created.id,
      created.name,
      created.email,
      created.status ? "active" : "inactive"
    );
  }

  async update(client: Client): Promise<Client> {
    const updated = await this.prisma.client.update({
      where: { id: client.id },
      data: {
        name: client.name,
        email: client.email,
        status: client.status === "active",
      },
    });

    return new Client(
      updated.id,
      updated.name,
      updated.email,
      updated.status ? "active" : "inactive"
    );
  }

  async findById(id: string): Promise<Client | null> {
    const found = await this.prisma.client.findUnique({
      where: { id },
      include: { assets: true },
    });

    if (!found) return null;

    return new Client(
      found.id,
      found.name,
      found.email,
      found.status ? "active" : "inactive"
    );
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();

    return clients.map(
      (c) => new Client(c.id, c.name, c.email, c.status ? "active" : "inactive")
    );
  }
}
