import { Objective } from '@prisma/client';
import { ObjectivesService } from './objectives.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto';

export class ObjectivesBusiness {
  constructor(private readonly objectiveService: ObjectivesService) {}

  async getAllObjectives(filter: string = ''): Promise<Objective[]> {
    if (filter == 'enabled') {
      return await this.objectiveService.findAllEnabled();
    }

    return await this.objectiveService.findAll();
  }

  async getObjectiveById(id: number): Promise<Objective> {
    return await this.objectiveService.findOne(id);
  }

  async createObjective(objective: CreateObjectiveDto): Promise<Objective> {
    return await this.objectiveService.create(objective);
  }

  async updateObjective(
    id: number,
    objective: UpdateObjectiveDto,
  ): Promise<Objective> {
    return await this.objectiveService.update(id, objective);
  }

  async deleteObjective(id: number): Promise<Objective> {
    const objective = {
      enabled: false,
    };
    return await this.objectiveService.update(id, objective);
    // return await this.objectiveService.remove(id);
  }
}
