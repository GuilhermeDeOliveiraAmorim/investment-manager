import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function buildServer() {
  const server = Fastify();

  // Swagger setup
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

  // Routes
  server.get("/ping", async () => ({ pong: "it works!" }));

  return server;
}
