import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.module";

export class TaskValidationPipe implements PipeTransform{
    readonly allowedStatus = [...Object.values(TaskStatus)];

    transform(value: any) {
        if (!this.validateValue(value)){
            throw new BadRequestException(`"${value}" is an invalid TaskStatus`)
        } else {
            return value;
        }
    }

    private validateValue(value: any){
        const idx = this.allowedStatus.indexOf(value);
        return idx !== -1;
    }
}