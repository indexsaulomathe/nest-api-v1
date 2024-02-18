import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteSchoolsService {
  constructor(private readonly prismaService: PrismaService) {}

  async remove(id: number): Promise<void> {
    try {
      const deletedSchool = await this.prismaService.school.delete({
        where: { id },
      });

      if (!deletedSchool) {
        throw new NotFoundException(`School with ID ${id} not found.`);
      }
    } catch (error) {
      throw new NotFoundException(`Failed to delete school with ID ${id}.`);
    }
  }
}
