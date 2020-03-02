import { PaloStatus } from "../palos.model";

export class GetPalosFilterDto {
    status: PaloStatus;
    search: string
}