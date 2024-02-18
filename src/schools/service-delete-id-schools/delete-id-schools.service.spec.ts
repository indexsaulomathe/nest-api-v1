import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteSchoolsService } from './delete-id-schools.service';

describe('DeleteSchoolsService', () => {
  let service: DeleteSchoolsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSchoolsService,
        {
          provide: PrismaService,
          useValue: {
            school: {
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeleteSchoolsService>(DeleteSchoolsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should remove a school', async () => {
      const mockDeletedSchool = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cnpjEscola: '123456789',
        nomeFantasia: 'School 1',
        descricaoCurso: 'Course description',
        siglaCurso: 'ABC',
        tipoCurso: 'Type',
        dataValidadeCurso: new Date(),
        situacaoCurso: 'Active',
        coordenadorCurso: 'John Doe',
      };
      jest
        .spyOn(prismaService.school, 'delete')
        .mockResolvedValue(mockDeletedSchool);

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException if school not found', async () => {
      jest.spyOn(prismaService.school, 'delete').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if deletion fails', async () => {
      jest.spyOn(prismaService.school, 'delete').mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
