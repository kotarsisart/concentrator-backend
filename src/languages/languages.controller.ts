import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Language } from '@prisma/client';
import { CreateLanguageDto } from './dto/create-language.dto';

/**
 * LanguagesController — API layer for the Language feature.
 *
 * Endpoints:
 * - GET /languages → returns all languages
 * - POST /languages → creates a new language
 */
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.create(dto);
  }
}
