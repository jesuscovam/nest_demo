import { PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.module";

export class TaskValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ];
    transform(value: any) {
        value = value

        return value;
    }
    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}