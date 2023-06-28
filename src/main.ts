import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any properties that are not in the DTO
      forbidNonWhitelisted: true, // This will throw an error if there are properties that are not in the DTO
    }),
  );
  // app.enableCors(); // This will allow any origin to access the API
  app.enableCors({
    origin: 'https://g00n.vercel.app/', // This will allow only the specified origin to access the API
    credentials: true, // This will allow cookies to be sent from the specified origin
  });
  await app.listen(5000);
}
bootstrap();
