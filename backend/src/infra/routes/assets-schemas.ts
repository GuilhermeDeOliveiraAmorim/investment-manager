import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

export const createAssetBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const assetResponseSchema = z.object({
  asset: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

export const findAllAssetsResponseSchema = z.object({
  assets: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
});

export const registerAssetSchemas = (server: FastifyInstance) => {
  server.addSchema({
    ...zodToJsonSchema(createAssetBodySchema),
    $id: "CreateAssetBody",
  });
  server.addSchema({
    ...zodToJsonSchema(assetResponseSchema),
    $id: "AssetResponse",
  });
  server.addSchema({
    ...zodToJsonSchema(findAllAssetsResponseSchema),
    $id: "FindAllAssetsResponse",
  });
};
