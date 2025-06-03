import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { logger } from "./logger";
import { assetRoutes } from "./routes/assets-routes";

export async function buildServer() {
  const server = Fastify();

  await server.register(swagger, {
    swagger: {
      info: {
        title: "Investment Manager API",
        version: "1.0.0",
        description: "API to manage clients and financial assets",
      },
    },
  });

  await server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  await assetRoutes(server);

  server.get("/ping", async () => {
    logger.info({
      code: "PING",
      message: "Ping endpoint hit",
      layer: "infra",
      meta: { timestamp: new Date().toISOString() },
    });
    return { pong: "it works!" };
  });

  return server;
}
