import { Injectable } from '@nestjs/common';
import { Palo, PaloStatus } from './palos.model';
import * as uuid from 'uuid/v1';
import { CreatePaloDto } from './dto/create-palo-dto';
import { GetPalosFilterDto } from './dto/get-palos-filter-dto';

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

    getAllPalos(): Palo[]{
      return this.palos;
    }

    getPalosWithFilter(getPalosFilterDto: GetPalosFilterDto): Palo[] {
        const {status, search} = getPalosFilterDto;
        const palos = this.palos;
        if(status){
            palos.filter(palo => palo.status === status);
        }

        if(search){
            palos.filter(palo =>
                palo.title.includes(search) ||
                palo.description.includes(search)    
            );
        }
        return palos;
    }

    getPaloById(id: string): Palo {
        return this.palos.find(palo => palo.id === id);
    }

    deletePalo(id: string): void {
        this.palos = this.palos.filter(palo => palo.id !== id);
    }

    updatePaloStatus(id:string, status: PaloStatus): Palo {
        const palo = this.getPaloById(id);
        palo.status = status;
        return palo;
    }
}
