import { Injectable, NotFoundException } from '@nestjs/common';
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
       const found = this.tasks.find(task => task.id === id);
        if (!found){
            throw new NotFoundException(`Task with "${id}" not found`);
        }
       return found;
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
      const found = this.getTaskById(id);
      this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
    

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}

