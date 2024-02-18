import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateSchoolsService } from './service-create-schools/create-schools.service';
import { FindAllSchoolsService } from './service-find-all-schools/find-all-schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { FindOneSchoolsService } from './service-find-one-schools/find-one-schools.service';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { UpdateSchoolService } from './service-update-schools/update-schools.service';
import { DeleteSchoolsService } from './service-delete-id-schools/delete-id-schools.service';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly createSchoolsService: CreateSchoolsService,
    private readonly findAllSchoolsService: FindAllSchoolsService,
    private readonly findOneSchoolsService: FindOneSchoolsService,
    private readonly updateSchoolService: UpdateSchoolService,
    private readonly deleteSchoolsService: DeleteSchoolsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiCreatedResponse({
    description: 'The school has been successfully created',
  })
  @ApiBadRequestResponse({ description: 'Invalid school data provided' })
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    const createdSchool =
      await this.createSchoolsService.create(createSchoolDto);
    return createdSchool;
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiOkResponse({ description: 'List of all schools', type: [Object] })
  async findAll() {
    const schools = await this.findAllSchoolsService.findAll();
    return schools;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiOkResponse({
    description: 'The school with the specified ID',
    type: Object,
  })
  @ApiNotFoundResponse({ description: 'School not found' })
  async findOne(@Param('id') id: string) {
    const school = await this.findOneSchoolsService.findOne(+id);
    return school;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a school by ID' })
  @ApiOkResponse({ description: 'The updated school', type: Object })
  @ApiNotFoundResponse({ description: 'School not found' })
  @ApiBadRequestResponse({ description: 'Invalid school data provided' })
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    const updatedSchool = await this.updateSchoolService.update(
      +id,
      updateSchoolDto,
    );
    return updatedSchool;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school by ID' })
  @ApiNoContentResponse({
    description: 'The school has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'School not found' })
  async remove(@Param('id') id: string) {
    await this.deleteSchoolsService.remove(+id);
  }
}
