import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto';
import { Objective } from '@prisma/client';

@Injectable()
export class ObjectivesService {
  constructor(private prisma: PrismaService) {}

  create(createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    return this.prisma.objective.create({ data: createObjectiveDto });
  }

  findAll(): Promise<Objective[]> {
    return this.prisma.objective.findMany();
  }

  findAllEnabled(): Promise<Objective[]> {
    return this.prisma.objective.findMany({
      where: {
        enabled: true,
      },
    });
  }

  findOne(id: number): Promise<Objective> {
    return this.prisma.objective.findUnique({ where: { id } });
  }

  update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    return this.prisma.objective.update({
      where: { id },
      data: updateObjectiveDto,
    });
  }

  remove(id: number) {
    return this.prisma.objective.delete({ where: { id } });
  }
}
