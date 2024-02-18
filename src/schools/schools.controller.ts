import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateSchoolsService } from './service-create-schools/create-schools.service';
import { FindAllSchoolsService } from './service-find-all-schools/find-all-schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { FindOneSchoolsService } from './service-find-one-schools/find-one-schools.service';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { UpdateSchoolService } from './service-update-schools/update-schools.service';
import { DeleteSchoolsService } from './service-delete-id-schools/delete-id-schools.service';

@Controller('schools')
export class SchoolsController {
  [x: string]: any;
  constructor(
    private readonly createSchoolsService: CreateSchoolsService,
    private readonly findAllSchoolsService: FindAllSchoolsService,
    private readonly findOneSchoolsService: FindOneSchoolsService,
    private readonly updateSchoolService: UpdateSchoolService,
    private readonly deleteSchoolsService: DeleteSchoolsService,
  ) {}

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    return await this.createSchoolsService.create(createSchoolDto);
  }

  @Get()
  async findAll() {
    return await this.findAllSchoolsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneSchoolsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return await this.updateSchoolService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteSchoolsService.remove(+id);
  }
}
