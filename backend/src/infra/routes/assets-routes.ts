import { FastifyInstance } from "fastify";
import { AssetFactory } from "../factories/asset.factory";
import { createAssetBodySchema } from "./assets-schemas";

export async function assetRoutes(server: FastifyInstance) {
  const assetUseCases = AssetFactory();

  server.route({
    method: "POST",
    url: "/assets",
    schema: {
      body: { $ref: "CreateAssetBody#" },
      response: {
        201: { $ref: "AssetResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
        },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
      tags: ["Assets"],
      description: "Create a new asset",
    },
    handler: async (request, reply) => {
      const parseResult = createAssetBodySchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: "Validation failed",
          issues: parseResult.error.errors,
        });
      }
      try {
        const result = await assetUseCases.create.execute(parseResult.data);
        return reply.status(201).send(result);
      } catch {
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });

  server.route({
    method: "GET",
    url: "/assets",
    schema: {
      response: {
        200: { $ref: "FindAllAssetsResponse#" },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
      tags: ["Assets"],
      description: "Get all assets",
    },
    handler: async (_request, reply) => {
      try {
        const result = await assetUseCases.findAll.execute();
        return reply.status(200).send(result);
      } catch {
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });
}
