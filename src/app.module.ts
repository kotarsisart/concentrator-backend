import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { PrismaService } from '../prisma/prisma.service';
import { CounterModule } from './counter/counter.module';
import { ContactModule } from './contact/contact.module';

/**
 * AppModule — root module of the application.
 *
 * Registers global configuration and feature modules:
 * - LanguagesModule
 * - UserModule
 * - AuthModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        JWT_EXPIRES_IN: Joi.string().default('1h'),
      }),
    }),
    CounterModule,
    ContactModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
