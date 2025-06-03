import pino from "pino";

const baseLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

type LogLayer =
  | "controller"
  | "usecase"
  | "repository"
  | "infra"
  | "middleware"
  | "unknown";

interface LogOptions {
  code: string;
  message: string;
  layer?: LogLayer;
  meta?: Record<string, unknown>;
}

export const logger = {
  info({ code, message, layer = "unknown", meta = {} }: LogOptions) {
    baseLogger.info({ code, layer, ...meta }, message);
  },

  warn({ code, message, layer = "unknown", meta = {} }: LogOptions) {
    baseLogger.warn({ code, layer, ...meta }, message);
  },

  error({ code, message, layer = "unknown", meta = {} }: LogOptions) {
    baseLogger.error({ code, layer, ...meta }, message);
  },

  fatal({ code, message, layer = "unknown", meta = {} }: LogOptions) {
    baseLogger.fatal({ code, layer, ...meta }, message);
  },
};
