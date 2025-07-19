import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { NotFoundExceptionFilter, VALIDATION_PIPE } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(VALIDATION_PIPE);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const PORT = process.env.AUTH_PORT ? Number(process.env.AUTH_PORT) : 3000;
  const HOST = process.env.TCP_HOST || '0.0.0.0';
  const TCP_PORT = process.env.AUTH_TCP_PORT
    ? Number(process.env.AUTH_TCP_PORT)
    : 3010;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: TCP_PORT,
    },
  });

  await app.listen(PORT, HOST);

  const logger = app.get('LoggerService');
  await app.startAllMicroservices();

  logger.log(
    `Auth App started on port ${process.env.AUTH_PORT}. TCP PORT: ${process.env.AUTH_TCP_PORT}`,
  );
}
bootstrap();
