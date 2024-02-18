import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @IsString({ message: 'CNPJ should be a string' })
  @ApiProperty({
    description: 'CNPJ of the school',
    example: '34.119.890/0001-77',
  })
  cnpjEscola: string;

  @IsString({ message: 'Fantasy name should be a string' })
  @ApiProperty({
    description: 'Fantasy name of the school',
    example: 'BEST FLIGHT ESCOLA DE AVIAÇÃO CIVIL',
  })
  nomeFantasia: string;

  @IsString({ message: 'Description should be a string' })
  @ApiProperty({
    description: 'Description of the course',
    example: 'INSTRUTOR DE VOO AVIÃO',
  })
  descricaoCurso: string;

  @IsString({ message: 'Acronym should be a string' })
  @ApiProperty({
    description: 'Acronym of the course',
    example: 'IVA',
  })
  siglaCurso: string;

  @IsString({ message: 'Type should be a string' })
  @ApiProperty({
    description: 'Type of the course',
    example: 'Teórico',
  })
  tipoCurso: string;

  @IsDate({ message: 'Invalid date format. Use a valid date string' })
  @ApiProperty({
    description: 'Validity date of the course',
    example: '/Date(1721185200000)/',
  })
  dataValidadeCurso: Date;

  @IsString({ message: 'Status should be a string' })
  @ApiProperty({
    description: 'Status of the course',
    example: 'Ativa',
  })
  situacaoCurso: string;

  @IsString({ message: 'Coordinator should be a string' })
  @ApiProperty({
    description: 'Coordinator of the course',
    example: 'DENILSON ABREU DA SILVA',
  })
  coordenadorCurso: string;
}
