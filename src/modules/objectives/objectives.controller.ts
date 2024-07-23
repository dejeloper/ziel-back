import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto';
import { ObjectivesBusiness } from './objectives.business';
import { CustomHttpException } from 'src/utils/errors/CustomException';
import { CustomResponse } from 'src/utils/responses/CustomResponse';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ObjectiveEntity } from './entities/objective.entity';

@Controller('objectives')
@ApiTags('objectives')
export class ObjectivesController {
  constructor(private readonly objectivesBusiness: ObjectivesBusiness) {}
  @Get()
  @ApiCreatedResponse({ type: ObjectiveEntity, isArray: true })
  async findAll() {
    try {
      const objectives = await this.objectivesBusiness.getAllObjectives();

      if (!objectives || objectives.length === 0) {
        throw new CustomHttpException(
          'Objetivos no encontrados',
          HttpStatus.NOT_FOUND,
        );
      }

      return CustomResponse(
        HttpStatus.OK,
        'Objetivos obtenido exitosamente',
        objectives,
        true,
      );
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('enabled')
  @ApiCreatedResponse({ type: ObjectiveEntity, isArray: true })
  async findAllEnabled() {
    try {
      const objectives =
        await this.objectivesBusiness.getAllObjectives('enabled');

      if (!objectives || objectives.length === 0) {
        throw new CustomHttpException(
          'Objetivos no encontrados',
          HttpStatus.NOT_FOUND,
        );
      }

      return CustomResponse(
        HttpStatus.OK,
        'Objetivos obtenido exitosamente',
        objectives,
        true,
      );
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ObjectiveEntity })
  async findOne(@Param('id') id: number) {
    try {
      const objectiveFound = await this.objectivesBusiness.getObjectiveById(id);
      if (!objectiveFound) {
        throw new CustomHttpException(
          'Objetivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return CustomResponse(
        HttpStatus.OK,
        'Objetivo obtenido exitosamente',
        objectiveFound,
        true,
      );
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  @ApiCreatedResponse({ type: ObjectiveEntity })
  async create(@Body() createObjectiveDto: CreateObjectiveDto) {
    try {
      const objective =
        await this.objectivesBusiness.createObjective(createObjectiveDto);
      return CustomResponse(
        HttpStatus.CREATED,
        'Objetivo creado exitosamente',
        objective,
        true,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ObjectiveEntity })
  async update(
    @Param('id') id: number,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    try {
      const objectiveFound = await this.objectivesBusiness.getObjectiveById(
        Number(id),
      );
      if (!objectiveFound) {
        throw new CustomHttpException(
          'Objetivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const objectiveUpdated = await this.objectivesBusiness.updateObjective(
        id,
        updateObjectiveDto,
      );
      return CustomResponse(
        HttpStatus.OK,
        'Objetivo actualizado exitosamente',
        objectiveUpdated,
        true,
      );
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ObjectiveEntity })
  async remove(@Param('id') id: number) {
    try {
      const objectiveFound = await this.objectivesBusiness.getObjectiveById(
        Number(id),
      );
      if (!objectiveFound) {
        throw new CustomHttpException(
          'Objetivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const objectiveUpdated =
        await this.objectivesBusiness.deleteObjective(id);
      return CustomResponse(
        HttpStatus.OK,
        'Objetivo eliminado exitosamente',
        objectiveUpdated,
        true,
      );
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      } else {
        throw new CustomHttpException(
          error instanceof Error ? error.message : 'Error interno del servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
