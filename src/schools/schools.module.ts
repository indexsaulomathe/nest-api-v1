import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { CreateSchoolsService } from './service-create-schools/create-schools.service';
import { FindAllSchoolsService } from './service-find-all-schools/find-all-schools.service';
import { FindOneSchoolsService } from './service-find-one-schools/find-one-schools.service';
import { UpdateSchoolService } from './service-update-schools/update-schools.service';
import { DeleteSchoolsService } from './service-delete-id-schools/delete-id-schools.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolsController],
  providers: [
    CreateSchoolsService,
    FindAllSchoolsService,
    FindOneSchoolsService,
    UpdateSchoolService,
    DeleteSchoolsService,
  ],
})
export class SchoolsModule {}
