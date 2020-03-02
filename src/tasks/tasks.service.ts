import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(taskFilterDto: GetTaskFilterDto): Task[] {
        const {status, search} = taskFilterDto;
        const tasks = this.getAllTasks();

        if (status){
            tasks.filter(task => task.status === status);
        }

        if (search){
            tasks.filter(task =>
                task.description.includes(search) ||
                task.title.includes(search)    
            )
        }
        return tasks;
    }

   getTaskById(id: string): Task {
       return this.tasks.find(task => task.id === id);
   }

   createTasks(createTaskDto: CreateTaskDto): Task {
       const { title, description } = createTaskDto;
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
   }

    deleteTask(id: string): void {
        this.tasks.filter(task => task.id !== id);
    }
    

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.tasks.find(task => task.id === id);
        task.status = status;
        return task;
    }

    updateTaskStatus2(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

}

