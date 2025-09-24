import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * LanguagesModule — feature module for managing languages.
 *
 * Includes:
 * - Controller
 * - Service
 * - PrismaService (for DB access)
 */
@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService, PrismaService],
})
export class LanguagesModule {}
