import { ApiProperty } from '@nestjs/swagger';
import { School } from '@prisma/client';

export class SchoolEntity implements School {
  @ApiProperty({ description: 'The unique identifier of the school' })
  id: number;

  @ApiProperty({ description: 'The timestamp when the school was created' })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the school was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The CNPJ of the school',
    example: '34.119.890/0001-77',
  })
  cnpjEscola: string;

  @ApiProperty({
    description: 'The name of the school',
    example: 'BEST FLIGHT ESCOLA DE AVIAÇÃO CIVIL',
  })
  nomeFantasia: string;

  @ApiProperty({
    description: 'The description of the course',
    example: 'INSTRUTOR DE VOO AVIÃO',
  })
  descricaoCurso: string;

  @ApiProperty({ description: 'The acronym of the course', example: 'IVA' })
  siglaCurso: string;

  @ApiProperty({ description: 'The type of the course', example: 'Teórico' })
  tipoCurso: string;

  @ApiProperty({
    description: 'The validity date of the course',
    example: '2023-01-01T00:00:00Z',
  })
  dataValidadeCurso: Date;

  @ApiProperty({ description: 'The status of the course', example: 'Ativa' })
  situacaoCurso: string;

  @ApiProperty({
    description: 'The coordinator of the course',
    example: 'DENILSON ABREU DA SILVA',
  })
  coordenadorCurso: string;
}
