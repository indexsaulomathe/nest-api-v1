import { Injectable, NotFoundException } from '@nestjs/common';
import { School } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSchoolDto } from '../dto/update-school.dto';

@Injectable()
export class UpdateSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const {
      cnpjEscola,
      nomeFantasia,
      descricaoCurso,
      siglaCurso,
      tipoCurso,
      dataValidadeCurso,
      situacaoCurso,
      coordenadorCurso,
    } = updateSchoolDto;

    try {
      const updatedSchool = await this.prismaService.school.update({
        where: { id },
        data: {
          cnpjEscola,
          nomeFantasia,
          descricaoCurso,
          siglaCurso,
          tipoCurso,
          dataValidadeCurso,
          situacaoCurso,
          coordenadorCurso,
        },
      });

      return updatedSchool;
    } catch (error) {
      throw new NotFoundException(`Failed to update school with ID ${id}`);
    }
  }
}
