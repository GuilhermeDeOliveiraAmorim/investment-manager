import { FastifyInstance } from "fastify";
import { AssetFactory } from "../factories/asset.factory";
import { createAssetBodySchema } from "../schemas/assets-schemas";

export async function assetRoutes(server: FastifyInstance) {
  const assetUseCases = AssetFactory();

  server.route({
    method: "POST",
    url: "/assets",
    schema: {
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Tesouro Direto",
          },
        },
        required: ["name"],
      },
      response: {
        201: { $ref: "AssetResponse#" },
        400: {
          type: "object",
          properties: {
            error: { type: "string" },
            issues: { type: "array" },
          },
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

      const result = await assetUseCases.create.execute(parseResult.data);
      return reply.status(201).send(result);
    },
  });

  server.route({
    method: "GET",
    url: "/assets",
    schema: {
      response: {
        200: { $ref: "FindAllAssetsResponse#" },
      },
      tags: ["Assets"],
      description: "Get all assets",
    },
    handler: async (_request, reply) => {
      const result = await assetUseCases.findAll.execute();

      return reply.status(200).send(result);
    },
  });
}
