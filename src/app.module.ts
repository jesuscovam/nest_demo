import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

import { PalosModule } from './palos/palos.module';



@Module({
  imports: [TasksModule, PalosModule],

})
export class AppModule {}
