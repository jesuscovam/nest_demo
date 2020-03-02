import { TaskStatus } from "../task.module";
import { IsOptional, IsIn } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([...Object.values(TaskStatus)])
    status: TaskStatus;

    @IsOptional()
    search: string;
}