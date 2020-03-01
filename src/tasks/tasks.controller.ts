import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.taskServices.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskServices.createTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void{
        this.taskServices.deleteTask(id);
    }
}
