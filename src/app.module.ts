import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { LanguagesModule } from './languages/languages.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

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
    LanguagesModule,
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
