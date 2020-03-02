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

    //I need an event that can handle a dto with query parameters to filter my models and 
    // retrieve an array of matches
    // for the sake of applying the filters on the same a array, Im going to return not 
    // the reference of my models, but an asign copy so I allow javascript to appy
    // both filters on the same array

    getPalosWithFilter(palosFilterDto: GetPalosFilterDto): Palo[]{
        const { status, search } = palosFilterDto;
        let palos = this.palos;

        if(status){
            palos = palos.filter(palo => palo.status === status);
        }
        
        if(search){
            palos = palos.filter(palo =>
                palo.title.includes(search) ||
                palo.description.includes(search)
            )
        }

        /*
            Same would be true if we also deconstructed
            the dto with a float value like
            priceRange

            if(priceRange){
                palos.filter(palo =>
                    palo.price => priceRange.min &&
                    palo.price <= priceRange.max)
                )
            }
        */
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
