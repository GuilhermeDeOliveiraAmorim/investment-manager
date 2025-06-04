import { PrismaClient } from "@prisma/client";
import { Client } from "../../domain/client";
import { ClientRepository } from "../../domain/repositories/client-repository";

export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(client: Client): Promise<Client> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async update(client: Client): Promise<Client> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Client | null> {
    try {
      const found = await this.prisma.client.findUnique({
        where: { id },
      });

      if (!found) return null;

      return new Client(
        found.id,
        found.name,
        found.email,
        found.status ? "active" : "inactive"
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.prisma.client.findMany();

      return clients.map(
        (c) =>
          new Client(c.id, c.name, c.email, c.status ? "active" : "inactive")
      );
    } catch (error) {
      throw error;
    }
  }
}
