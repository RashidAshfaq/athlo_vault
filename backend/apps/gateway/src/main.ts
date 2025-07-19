import { NotFoundExceptionFilter, VALIDATION_PIPE } from '@app/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as path from 'path';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  let httpsOptions = {
    key: undefined,
    cert: undefined,
  };

  if (
    process.env.BUILD_TYPE !== 'development' &&
    process.env.BUILD_TYPE !== 'local'
  ) {
    let key, cert;

    if (process.env.BUILD_TYPE === 'uat') {
      key = fs.readFileSync(
        path.resolve(__dirname, '../../../../certs/uat_doclinq.key'),
      );

      cert = fs.readFileSync(
        path.resolve(__dirname, '../../../../certs/uat_backend_crt.pem'),
      );
    } else if (process.env.BUILD_TYPE === 'production') {
      key = fs.readFileSync(
        path.resolve(__dirname, '../../../../certs/prod_doclinq.key'),
      );

      cert = fs.readFileSync(
        path.resolve(__dirname, '../../../../certs/prod_backend_crt.pem'),
      );
    }

    httpsOptions = {
      key,
      cert,
    };
  }

  const app = await NestFactory.create(
    GatewayModule,
    httpsOptions.key ? { httpsOptions } : {},
  );

  app.useGlobalPipes(VALIDATION_PIPE);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',') || [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.use(
    '/auth',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.AUTH_PORT}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/athlete',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.ATHLETE_PORT}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/investor',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.INVESTOR_PORT}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/admin',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.ADMIN_PORT}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/fan',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.FAN_PORT}`,
      changeOrigin: true,
    }),
  );

  await app.listen(process.env.GATEWAY_PORT);

  const logger = app.get('LoggerService');
  logger.log(`App started on port ${process.env.GATEWAY_PORT}`);
}
bootstrap();
