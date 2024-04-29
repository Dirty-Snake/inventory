import { Module } from '@nestjs/common';
import { ResponsibleHistoriesService } from './responsible-histories.service';
import { ResponsibleHistoriesController } from './responsible-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleHistorySchema } from './responsible-history.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleHistorySchema])],
  controllers: [ResponsibleHistoriesController],
  providers: [ResponsibleHistoriesService],
  exports: [ResponsibleHistoriesService],
})
export class ResponsibleHistoriesModule {}
