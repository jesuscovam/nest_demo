import { Injectable } from '@nestjs/common';
import { Palo, PaloStatus } from './palos.model';
import * as uuid from 'uuid/v1';
import { CreatePaloDto } from './dto/create-palo-dto';

@Injectable()
export class PalosService {
    private palos: Palo[] = [];
    createPalo(createPaloDto: CreatePaloDto): Palo {
        const { title, description } = createPaloDto;
        const palo: Palo = {
            id: uuid(),
            title,
            description,
            status : PaloStatus.OPEN
        }
        this.palos.push(palo);
        return palo;
    }
}
