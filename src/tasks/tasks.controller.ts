import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.taskServices.getTaskWithFilters(filterDto);
        } else {
            return this.taskServices.getAllTasks();
        }
    }
   
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskServices.createTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void{
        this.taskServices.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
        ): Task {
        return this.taskServices.updateTaskStatus(id,status);
    }
}
