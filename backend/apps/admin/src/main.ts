import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { NotFoundExceptionFilter, VALIDATION_PIPE } from '@app/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.useGlobalPipes(VALIDATION_PIPE);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Provide default values for environment variables
  const PORT = process.env.ADMIN_PORT ? Number(process.env.ADMIN_PORT) : 3000;
  const HOST = process.env.TCP_HOST || '0.0.0.0';
  const TCP_PORT = process.env.ADMIN_TCP_PORT ? Number(process.env.ADMIN_TCP_PORT) : 3010;

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
    `Admin App started on port ${PORT}. TCP PORT: ${TCP_PORT}`,
  );
}
bootstrap();
