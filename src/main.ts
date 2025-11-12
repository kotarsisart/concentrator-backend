import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const allowedOrigins = [
    'https://concentrator.vercel.app',
    'http://localhost:5173',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT || configService.get<number>('PORT') || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
}

bootstrap();
