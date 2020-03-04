import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }


    async getTaskById(id: number): Promise<Task> {
            const found = await this.taskRepository.findOne(id);
            if(!found){
                throw new BadRequestException(`"${id}" is an invalidad id`)
            } else {
                return found;
            }
        }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);
        if(task.affected === 0){
            throw new BadRequestException(`"${id}" is an invalidad id`)
        }

    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        await task.save();
        return task
    }
}

