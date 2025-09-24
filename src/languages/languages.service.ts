import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLanguageDto } from './dto/create-language.dto';

/**
 * LanguagesService — business logic layer for the Language feature.
 *
 * ✔ Creates a new language with unique constraint validation.
 * ✔ Retrieves all existing languages.
 * ✔ Handles Prisma errors (conflict, DB failures).
 */
@Injectable()
export class LanguagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLanguageDto) {
    try {
      return await this.prisma.language.create({ data: dto });
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(
            `Language with code "${dto.code}" already exists`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Database error: ' + (err as Error).message,
      );
    }
  }

  async findAll() {
    return this.prisma.language.findMany();
  }
}
