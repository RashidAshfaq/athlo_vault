import { NotFoundExceptionFilter } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { VALIDATION_PIPE } from '@app/common/constant';
import { InvestorModule } from './investor.module';

async function bootstrap() {
  const app = await NestFactory.create(InvestorModule);
  app.useGlobalPipes(VALIDATION_PIPE);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Provide default values for environment variables
  const PORT = process.env.INVESTOR_PORT
    ? Number(process.env.INVESTOR_PORT)
    : 3000;
  const HOST = process.env.TCP_HOST || '0.0.0.0';
  const TCP_PORT = process.env.INVESTOR_TCP_PORT
    ? Number(process.env.INVESTOR_TCP_PORT)
    : 3010;

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

  logger.log(`Investor App started on port ${PORT}. TCP PORT: ${TCP_PORT}`);
}
bootstrap();
