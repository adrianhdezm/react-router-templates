import compression from 'compression';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

// Initialize the logger with desired options
const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

// Short-circuit the type-checking of the built output.
const BUILD_PATH = './build/server/index.js';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PORT = Number.parseInt(process.env.PORT || '3000');

const app = express();

app.use(compression());
app.disable('x-powered-by');

app.use(
  pinoHttp({
    logger,
    // Define custom serializers
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    },

    // Set to `false` to prevent standard serializers from being wrapped.
    wrapSerializers: true,

    autoLogging: {
      ignore: (req) => {
        // Ignore logging for static asset requests
        return req.url.startsWith('/@vite') || req.url.startsWith('/node_modules');
      }
    },

    // Define a custom logger level
    customLogLevel: (_req, res, err) => {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return 'silent';
      }
      return 'info';
    }
  })
);

if (DEVELOPMENT) {
  logger.info('Starting development server');
  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({
      server: { middlewareMode: true }
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = (await viteDevServer.ssrLoadModule('./server/app.ts')) as { app: express.Express };
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  logger.info('Starting production server');
  app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }));
  app.use(express.static('build/client', { maxAge: '1h' }));
  app.use(await import(BUILD_PATH).then((mod: { app: express.Express }) => mod.app));
}

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
