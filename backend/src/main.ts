import { logger } from "./infra/logger";
import { buildServer } from "./infra/server";

const start = async () => {
  const app = await buildServer();

  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });

    logger.info({
      code: "APP_START",
      message: "Server running at http://localhost:3001",
      layer: "infra",
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
