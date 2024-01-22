import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ProcessEnvEnum } from './modules/config/config.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const logger = new Logger('Bootstrap');
  const globalPrefix = configService.getEnvVal(ProcessEnvEnum.GLOBAL_PREFIX);

  configService.getPort();

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.getPort() || 3000;

  await app.listen(port);

  logger.log(
    `\n\n ..:: server is running on: http://localhost:${port}/${globalPrefix} \n\n`,
  );
}
bootstrap();
