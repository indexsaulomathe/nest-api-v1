import { Injectable, NotFoundException } from '@nestjs/common';
import { School } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FindOneSchoolsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number): Promise<School> {
    try {
      const school = await this.prismaService.school.findUnique({
        where: { id },
      });
      if (!school) {
        throw new NotFoundException(`School with ID ${id} not found.`);
      }
      return school;
    } catch (error) {
      throw new NotFoundException(`Failed to find the school with ID ${id}.`);
    }
  }
}
