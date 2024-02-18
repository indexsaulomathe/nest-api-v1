import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    example: 'The title of the article',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @ApiProperty({
    type: String,
    maxLength: 300,
    required: false,
    example: 'A brief description of the article',
  })
  @IsString()
  @MaxLength(300, { message: 'Description cannot exceed 300 characters' })
  description?: string;

  @ApiProperty({
    type: String,
    example: 'The content of the article',
  })
  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    example: false,
  })
  @IsBoolean()
  published?: boolean;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber({}, { message: 'School ID must be a number' })
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}
