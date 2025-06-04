import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { logger } from "./logger";
import { assetRoutes } from "./routes/assets-routes";
import { allocationRoutes } from "./routes/allocation-routes";
import { clientRoutes } from "./routes/client-routes";
import { registerAllocationSchemas } from "./routes/allocation-schemas";
import { registerAssetSchemas } from "./routes/assets-schemas";
import { registerClientSchemas } from "./routes/client-schemas";
import { ZodError } from "zod";
import { ProblemDetailError } from "../exceptions/problem.detail.error";

export async function buildServer() {
  const server = Fastify();

  server.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        type: "https://zod.dev/validation-error",
        title: "Erro de validação",
        status: 400,
        detail: "Um ou mais campos são inválidos.",
        issues: error.issues,
        instance: request.url,
      });
    }

    if (error instanceof ProblemDetailError) {
      return reply.status(error.status).send({
        type: error.type,
        title: error.title,
        status: error.status,
        detail: error.detail,
        instance: error.instance || request.url,
        ...(error.extra ?? {}),
      });
    }

    return reply.status(500).send({
      type: "https://httpstatuses.com/500",
      title: "Erro interno no servidor",
      status: 500,
      detail: error.message,
      instance: request.url,
    });
  });

  registerAllocationSchemas(server);
  registerAssetSchemas(server);
  registerClientSchemas(server);

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
  await allocationRoutes(server);
  await clientRoutes(server);

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
