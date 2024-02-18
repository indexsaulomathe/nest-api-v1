import { Injectable, NotFoundException } from '@nestjs/common';
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
      const createdSchool = await this.prismaService.school.create({
        data: { ...createSchoolDto },
      });

      return createdSchool;
    } catch (error) {
      this.logger.error(`Error creating school: ${error.message}`);
      throw new NotFoundException('Failed to create school');
    }
  }
}
