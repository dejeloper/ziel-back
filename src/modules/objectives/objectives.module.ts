import { Module } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { ObjectivesController } from './objectives.controller';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { ObjectivesBusiness } from './objectives.business';

@Module({
  controllers: [ObjectivesController],
  providers: [ObjectivesBusiness, ObjectivesService],
  imports: [PrismaModule],
})
export class ObjectivesModule {}
