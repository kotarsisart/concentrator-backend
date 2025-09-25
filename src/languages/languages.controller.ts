import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * LanguagesController manages language endpoints.
 * GET is public, POST requires valid JWT (admin only in future).
 */
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  /**
   * Get all languages (public).
   * @returns Array of languages
   */
  @Get()
  async findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }

  /**
   * Create a new language (protected by JWT).
   * @param dto - Language data (name, code)
   * @returns Created language
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.create(dto);
  }
}
