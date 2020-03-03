import { Controller, Get, Param, ParseIntPipe,  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';


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

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.taskServices.createTasks(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void{
    //     this.taskServices.deleteTask(id);
    // }

    // @Patch('/:id/status')

    // updateTask(
    //     @Param('id') id: string,
    //     @Body('status', TaskValidationPipe) status: TaskStatus
    //     ): Task {
    //     return this.taskServices.updateTaskStatus(id,status);
    // }
}
