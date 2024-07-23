import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectiveDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false, default: true })
  enabled: boolean;
}
