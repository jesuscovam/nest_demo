import { Repository } from "typeorm";
import { Coin } from "./coins.entity";
import { CreateCoinDto } from "./dtos/create-coin-dto";
import { CoinStatus } from "./coin.model";


export class CoinRepository extends Repository<Coin>{
    
    async createRepository(createCoinDto: CreateCoinDto){
        const { title, description } = createCoinDto;
       
    }
}


