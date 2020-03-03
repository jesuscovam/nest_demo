import { PipeTransform, BadRequestException } from "@nestjs/common";
import { CoinStatus } from "../coin.model";


export class CoinValidationPipe implements PipeTransform{
    readonly allowedStatus = [...Object.values(CoinStatus)]

    transform(value: any){
        if(!this.statusIsValid(value)){
            throw new BadRequestException(`"${value}" is an invalid CoinStatus`)
        } else {
            return value;
        }
    }

    private statusIsValid(value: any){
        const idx = this.allowedStatus.indexOf(value);
        return idx !== -1;
    }
}