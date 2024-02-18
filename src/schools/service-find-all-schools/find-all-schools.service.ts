import { Injectable, NotFoundException } from '@nestjs/common';
import { School } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindAllSchoolsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<School[]> {
    try {
      const allSchools = await this.prismaService.school.findMany();
      return allSchools;
    } catch (error) {
      throw new NotFoundException('Failed to find schools');
    }
  }
}
