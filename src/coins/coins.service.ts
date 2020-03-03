import { Injectable, BadRequestException } from '@nestjs/common';
import { Coin, CoinStatus } from './coin.model';
import { CreateCoinDto } from './dtos/create-coin-dto';
import * as uuid from 'uuid/v1'
import { CoinsWithFilterDto } from './dtos/coins-with-filter-dto';


@Injectable()
export class CoinsService {
    private coins: Coin[] = [];

    createCoin(createCoinDto: CreateCoinDto): Coin {
        const { title, description } = createCoinDto;
        const coin: Coin ={
            id: uuid(),
            title,
            description,
            status: CoinStatus.OPEN
        }
        this.coins.push(coin);
        return coin; 
    }

    getCoins(): Coin[]{
        return this.coins;
    }

    getCoinsWithFilter(coinsWithFilter: CoinsWithFilterDto): Coin[]{
        const { search, status } = coinsWithFilter;
        let coins = this.coins
        
        if(status){
            coins = this.coins.filter(coin => coin.status == status);
        }

        if(search){
            coins = this.coins.filter(coin =>
                coin.title.includes(search) ||
                coin.description.includes(search)    
            )
        }
        return coins;
    }

    getCoinById(id: string): Coin{
        const found = this.coins.find(coin => coin.id === id);
        if(!found){
            throw new BadRequestException(`"${id}" is an invalid id`)
        } else {
            return found;
        }
    }

    deleteCoin(id: string): void {
        const found = this.getCoinById(id);
        this.coins.filter(coin => coin.id !== found.id);
    }

    updateCoinStatus(id: string, status: CoinStatus): Coin {
        const found = this.getCoinById(id);
        found.status = status;
        return found;
    }
}
