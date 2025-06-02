import { buildServer } from "./infra/http/server";

const start = async () => {
  const app = await buildServer();

  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
