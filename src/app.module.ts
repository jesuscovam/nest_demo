import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CoinsModule } from './coins/coins.module';





@Module({
  imports: [TasksModule, CoinsModule],

})
export class AppModule {}
