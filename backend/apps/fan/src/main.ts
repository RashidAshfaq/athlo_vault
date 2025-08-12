
import { NestFactory } from '@nestjs/core';
import { NotFoundExceptionFilter, VALIDATION_PIPE } from '@app/common';
import { Transport } from '@nestjs/microservices';
import { FanModule } from './fan.module';

async function bootstrap() {
  const app = await NestFactory.create(FanModule);
  app.useGlobalPipes(VALIDATION_PIPE);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Provide default values for environment variables
  const PORT = process.env.FAN_PORT ? Number(process.env.FAN_PORT) : 3000;
  const HOST = process.env.TCP_HOST || '0.0.0.0';
  const TCP_PORT = process.env.FAN_TCP_PORT ? Number(process.env.FAN_TCP_PORT) : 3010;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: TCP_PORT,
    },
  });

  // Use the validated variables
  await app.listen(PORT, HOST);

  const logger = app.get('LoggerService');
  await app.startAllMicroservices();

  logger.log(
    `Fan App started on port ${PORT}. TCP PORT: ${TCP_PORT}`,
  );
}
bootstrap();
