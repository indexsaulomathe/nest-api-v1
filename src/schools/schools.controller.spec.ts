import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { CreateSchoolsService } from './service-create-schools/create-schools.service';
import { FindAllSchoolsService } from './service-find-all-schools/find-all-schools.service';
import { FindOneSchoolsService } from './service-find-one-schools/find-one-schools.service';
import { UpdateSchoolService } from './service-update-schools/update-schools.service';
import { DeleteSchoolsService } from './service-delete-id-schools/delete-id-schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

describe('SchoolsController', () => {
  let controller: SchoolsController;
  let createSchoolsService: CreateSchoolsService;
  let findAllSchoolsService: FindAllSchoolsService;
  let findOneSchoolsService: FindOneSchoolsService;
  let updateSchoolService: UpdateSchoolService;
  let deleteSchoolsService: DeleteSchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        CreateSchoolsService,
        FindAllSchoolsService,
        FindOneSchoolsService,
        UpdateSchoolService,
        DeleteSchoolsService,
      ],
    }).compile();

    controller = module.get<SchoolsController>(SchoolsController);
    createSchoolsService =
      module.get<CreateSchoolsService>(CreateSchoolsService);
    findAllSchoolsService = module.get<FindAllSchoolsService>(
      FindAllSchoolsService,
    );
    findOneSchoolsService = module.get<FindOneSchoolsService>(
      FindOneSchoolsService,
    );
    updateSchoolService = module.get<UpdateSchoolService>(UpdateSchoolService);
    deleteSchoolsService =
      module.get<DeleteSchoolsService>(DeleteSchoolsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new school', async () => {
      const createSchoolDto: CreateSchoolDto = {
        cnpjEscola: '',
        nomeFantasia: '',
        descricaoCurso: '',
        siglaCurso: '',
        tipoCurso: '',
        dataValidadeCurso: undefined,
        situacaoCurso: '',
        coordenadorCurso: '',
      };
      const createdSchool: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cnpjEscola: string;
        nomeFantasia: string;
        descricaoCurso: string;
        siglaCurso: string;
        tipoCurso: string;
        dataValidadeCurso: Date;
        situacaoCurso: string;
        coordenadorCurso: string;
      } = {
        id: 0,
        createdAt: undefined,
        updatedAt: undefined,
        cnpjEscola: '',
        nomeFantasia: '',
        descricaoCurso: '',
        siglaCurso: '',
        tipoCurso: '',
        dataValidadeCurso: undefined,
        situacaoCurso: '',
        coordenadorCurso: '',
      }; // Mock da escola criada
      jest
        .spyOn(createSchoolsService, 'create')
        .mockResolvedValue(createdSchool);

      expect(await controller.create(createSchoolDto)).toBe(createdSchool);
    });
  });

  describe('findAll', () => {
    it('should return all schools', async () => {
      const schools = []; // Mock das escolas encontradas
      jest.spyOn(findAllSchoolsService, 'findAll').mockResolvedValue(schools);

      expect(await controller.findAll()).toBe(schools);
    });
  });

  describe('findOne', () => {
    it('should return a school by ID', async () => {
      const id = '1'; // ID da escola a ser encontrada
      const school: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cnpjEscola: string;
        nomeFantasia: string;
        descricaoCurso: string;
        siglaCurso: string;
        tipoCurso: string;
        dataValidadeCurso: Date;
        situacaoCurso: string;
        coordenadorCurso: string;
      } = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cnpjEscola: '123456789',
        nomeFantasia: 'Escola ABC',
        descricaoCurso: 'Curso de Matemática',
        siglaCurso: 'MAT',
        tipoCurso: 'Graduação',
        dataValidadeCurso: new Date(),
        situacaoCurso: 'Ativo',
        coordenadorCurso: 'John Doe',
      }; // Mock da escola encontrada
      jest.spyOn(findOneSchoolsService, 'findOne').mockResolvedValue(school);

      expect(await controller.findOne(id)).toBe(school);
    });
  });

  describe('update', () => {
    it('should update a school by ID', async () => {
      const id = '1'; // ID da escola a ser atualizada
      const updateSchoolDto: UpdateSchoolDto = {
        // Preencha os dados necessários para atualizar a escola
      };
      const updatedSchool: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cnpjEscola: string;
        nomeFantasia: string;
        descricaoCurso: string;
        siglaCurso: string;
        tipoCurso: string;
        dataValidadeCurso: Date;
        situacaoCurso: string;
        coordenadorCurso: string;
      } = {
        id: 0,
        createdAt: undefined,
        updatedAt: undefined,
        cnpjEscola: '',
        nomeFantasia: '',
        descricaoCurso: '',
        siglaCurso: '',
        tipoCurso: '',
        dataValidadeCurso: undefined,
        situacaoCurso: '',
        coordenadorCurso: '',
      }; // Mock da escola atualizada
      jest
        .spyOn(updateSchoolService, 'update')
        .mockResolvedValue(updatedSchool);

      expect(await controller.update(id, updateSchoolDto)).toBe(updatedSchool);
    });
  });

  describe('remove', () => {
    it('should remove a school by ID', async () => {
      const id = '1'; // ID da escola a ser removida
      const mockResponse = {}; // Mock da resposta de remoção
      jest
        .spyOn(deleteSchoolsService, 'remove')
        .mockResolvedValue(mockResponse as Promise<void>);

      expect(await controller.remove(id)).toBe(mockResponse);
    });
  });
});
