import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CoinsModule } from './coins/coins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';





@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule, 
    CoinsModule],

})
export class AppModule {}
