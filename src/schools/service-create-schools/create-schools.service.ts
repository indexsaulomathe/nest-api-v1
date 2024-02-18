import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { School } from '@prisma/client';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class CreateSchoolsService {
  private readonly logger = new Logger(CreateSchoolsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      return await this.prismaService.school.create({ data: createSchoolDto });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    this.logger.error(`Error creating school: ${error.message}`);
    if (error.code === 'P2002' && error.meta?.target?.includes('cnpj_escola')) {
      throw new InternalServerErrorException(
        'Failed to create school: CNPJ already exists',
      );
    }

    throw new InternalServerErrorException('Failed to create school');
  }
}
