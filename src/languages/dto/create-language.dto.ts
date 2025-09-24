import { IsString, Length } from 'class-validator';

/**
 * DTO for creating a new language.
 *
 * Constraints:
 * - name: string, 2–50 chars
 * - code: string, 2–5 chars
 */
export class CreateLanguageDto {
  @IsString({ message: 'Language name must be a string' })
  @Length(2, 50, {
    message: 'Language name must be between 2 and 50 characters',
  })
  name: string;

  @IsString({ message: 'Language code must be a string' })
  @Length(2, 5, { message: 'Language code must be between 2 and 5 characters' })
  code: string;
}
