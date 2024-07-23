import { ApiProperty } from '@nestjs/swagger';
import { Objective } from '@prisma/client';

export class ObjectiveEntity implements Objective {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
