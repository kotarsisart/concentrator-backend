import { Module } from '@nestjs/common';
import { LanguagesModule } from './languages/languages.module';

/**
 * AppModule — root module of the application.
 *
 * Registers feature modules:
 * - LanguagesModule
 */
@Module({
  imports: [LanguagesModule],
})
export class AppModule {}
