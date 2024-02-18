import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateSchoolDto {
  @IsOptional()
  @IsString({ message: 'CNPJ should be a string' })
  @ApiPropertyOptional({
    description: 'CNPJ of the school',
    example: '34.119.890/0001-77',
  })
  cnpjEscola?: string;

  @IsOptional()
  @IsString({ message: 'Fantasy name should be a string' })
  @ApiPropertyOptional({
    description: 'Fantasy name of the school',
    example: 'BEST FLIGHT ESCOLA DE AVIAÇÃO CIVIL',
  })
  nomeFantasia?: string;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  @ApiPropertyOptional({
    description: 'Description of the course',
    example: 'INSTRUTOR DE VOO AVIÃO',
  })
  descricaoCurso?: string;

  @IsOptional()
  @IsString({ message: 'Acronym should be a string' })
  @ApiPropertyOptional({
    description: 'Acronym of the course',
    example: 'IVA',
  })
  siglaCurso?: string;

  @IsOptional()
  @IsString({ message: 'Type should be a string' })
  @ApiPropertyOptional({
    description: 'Type of the course',
    example: 'Teórico',
  })
  tipoCurso?: string;

  @IsOptional()
  @IsDate({ message: 'Invalid date format. Use a valid date string' })
  @ApiPropertyOptional({
    description: 'Validity date of the course',
    example: '2024-05-17T12:00:00.000Z',
  })
  dataValidadeCurso?: Date;

  @IsOptional()
  @IsString({ message: 'Status should be a string' })
  @ApiPropertyOptional({
    description: 'Status of the course',
    example: 'Ativa',
  })
  situacaoCurso?: string;

  @IsOptional()
  @IsString({ message: 'Coordinator should be a string' })
  @ApiPropertyOptional({
    description: 'Coordinator of the course',
    example: 'DENILSON ABREU DA SILVA',
  })
  coordenadorCurso?: string;
}
