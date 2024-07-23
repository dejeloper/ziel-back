import { Module } from '@nestjs/common';
import { ObjectivesModule } from './modules/objectives/objectives.module';

@Module({
  imports: [ObjectivesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
