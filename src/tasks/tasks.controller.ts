import { Controller, Get, Param, ParseIntPipe, Body, Post, UsePipes, ValidationPipe, Delete, Patch,  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskValidationPipe } from './pipes/task-validation-pipe';
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    // @Get()
    // getTasks(@Query(ValidationPipe)  filterDto: GetTaskFilterDto ): Task[] {
    //     if(Object.keys(filterDto).length) {
    //         return this.taskServices.getTaskWithFilters(filterDto);
    //     } else {
    //         return this.taskServices.getAllTasks();
    //     }
    // }
   
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskServices.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.taskServices.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskValidationPipe) status: TaskStatus
        ): Promise<Task> {
        return this.taskServices.updateTaskStatus(id, status)
    }
}
