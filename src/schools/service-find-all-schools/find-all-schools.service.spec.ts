import { Test, TestingModule } from '@nestjs/testing';
import { FindAllSchoolsService } from './find-all-schools.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('FindAllSchoolsService', () => {
  let service: FindAllSchoolsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllSchoolsService,
        {
          provide: PrismaService,
          useValue: {
            school: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FindAllSchoolsService>(FindAllSchoolsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all schools', async () => {
      const mockSchools = [
        {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjEscola: '123456789',
          nomeFantasia: 'School 1',
          descricaoCurso: 'Course description',
          siglaCurso: 'ABC',
          tipoCurso: 'Type A',
          dataValidadeCurso: new Date(),
          situacaoCurso: 'Active',
          coordenadorCurso: 'John Doe',
        },
        {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjEscola: '987654321',
          nomeFantasia: 'School 2',
          descricaoCurso: 'Course description',
          siglaCurso: 'DEF',
          tipoCurso: 'Type B',
          dataValidadeCurso: new Date(),
          situacaoCurso: 'Active',
          coordenadorCurso: 'Jane Doe',
        },
      ];
      jest
        .spyOn(prismaService.school, 'findMany')
        .mockResolvedValue(mockSchools);

      const result = await service.findAll();
      expect(result).toEqual(mockSchools);
    });

    it('should throw NotFoundException if no schools found', async () => {
      jest.spyOn(prismaService.school, 'findMany').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrowError(NotFoundException);
    });
  });
});
