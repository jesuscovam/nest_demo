import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
//     private tasks: Task[] = [];

//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTaskWithFilters(taskFilterDto: GetTaskFilterDto): Task[] {
//         const {status, search} = taskFilterDto;
//         const tasks = this.getAllTasks();

//         if (status){
//             tasks.filter(task => task.status === status);
//         }

//         if (search){
//             tasks.filter(task =>
//                 task.description.includes(search) ||
//                 task.title.includes(search)    
//             )
//         }
//         return tasks;
//     }

    async getTaskById(id: number): Promise<Task> {
            const found = await this.taskRepository.findOne(id);
            if(!found){
                throw new BadRequestException(`"${id}" is an invalidad id`)
            } else {
                return found;
            }
        }


//    createTasks(createTaskDto: CreateTaskDto): Task {
//        const { title, description } = createTaskDto;
//         const task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN
//         }

//         this.tasks.push(task);
//         return task;
//    }

//     deleteTask(id: string): void {
//       const found = this.getTaskById(id);
//       this.tasks = this.tasks.filter(task => task.id !== found.id);
//     }
    

//     updateTaskStatus(id: string, status: TaskStatus): Task {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }
}

