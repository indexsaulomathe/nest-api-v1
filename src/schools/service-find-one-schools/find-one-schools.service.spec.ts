import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FindOneSchoolsService } from './find-one-schools.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('FindOneSchoolsService', () => {
  let service: FindOneSchoolsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneSchoolsService,
        {
          provide: PrismaService,
          useValue: {
            school: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FindOneSchoolsService>(FindOneSchoolsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a school when found', async () => {
      const mockSchool = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cnpjEscola: '123456789',
        nomeFantasia: 'Test School',
        descricaoCurso: 'Test Course',
        siglaCurso: 'TC',
        tipoCurso: 'Test Type',
        dataValidadeCurso: new Date(),
        situacaoCurso: 'Active',
        coordenadorCurso: 'Test Coordinator',
      };
      jest
        .spyOn(prismaService.school, 'findUnique')
        .mockResolvedValue(mockSchool);

      const result = await service.findOne(1);
      expect(result).toEqual(mockSchool);
    });

    it('should throw NotFoundException if school is not found', async () => {
      jest.spyOn(prismaService.school, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
