import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSchoolService } from './update-schools.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateSchoolDto } from '../dto/update-school.dto';

describe('UpdateSchoolService', () => {
  let service: UpdateSchoolService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSchoolService,
        {
          provide: PrismaService,
          useValue: {
            school: {
              update: jest.fn(), // Mocking the update method
            },
          },
        },
      ],
    }).compile();

    service = module.get<UpdateSchoolService>(UpdateSchoolService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update a school', async () => {
      const mockId = 1;
      const mockUpdateDto: UpdateSchoolDto = {
        // Update DTO properties here
      };

      const mockUpdatedSchool = {
        id: mockId,
        createdAt: new Date(),
        updatedAt: new Date(),
        cnpjEscola: 'example',
        nomeFantasia: 'example',
        descricaoCurso: 'example',
        siglaCurso: 'example',
        tipoCurso: 'example',
        dataValidadeCurso: new Date(),
        situacaoCurso: 'example',
        coordenadorCurso: 'example',
      };

      jest
        .spyOn(prismaService.school, 'update')
        .mockResolvedValue(mockUpdatedSchool);

      const result = await service.update(mockId, mockUpdateDto);

      expect(result).toEqual(mockUpdatedSchool);
      expect(prismaService.school.update).toHaveBeenCalledWith({
        where: { id: mockId },
        data: mockUpdateDto,
      });
    });

    it('should throw NotFoundException if school not found', async () => {
      const mockId = 1;
      const mockUpdateDto: UpdateSchoolDto = {
        // Update DTO properties here
      };

      jest.spyOn(prismaService.school, 'update').mockResolvedValue(null);

      await expect(service.update(mockId, mockUpdateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
