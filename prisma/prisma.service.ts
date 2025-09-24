import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService — wrapper around Prisma Client
 * that integrates with NestJS lifecycle hooks.
 *
 * ✔ Automatically connects the client on app start.
 * ✔ Gracefully disconnects on shutdown.
 * ✔ Used in feature services for database access.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
