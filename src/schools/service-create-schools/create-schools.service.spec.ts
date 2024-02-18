import { Test, TestingModule } from '@nestjs/testing';
import { CreateSchoolsService } from './create-schools.service';

describe('SchoolsService', () => {
  let service: CreateSchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSchoolsService],
    }).compile();

    service = module.get<CreateSchoolsService>(CreateSchoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
