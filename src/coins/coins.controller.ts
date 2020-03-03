import { Controller, Post, UsePipes, ValidationPipe, Get, Query, Param } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dtos/create-coin-dto';
import { Coin } from './coin.model';
import { CoinsWithFilterDto } from './dtos/coins-with-filter-dto';

@Controller('coins')
export class CoinsController {
    constructor(private coinService: CoinsService){}

    @Post()
    @UsePipes(ValidationPipe)
    createCoin(createCoin: CreateCoinDto): Coin{
        return this.coinService.createCoin(createCoin);
    }

    @Get()
    getCoins(@Query(ValidationPipe) coinWithFilterDto: CoinsWithFilterDto): Coin[]{
        if(Object.keys(coinWithFilterDto).length){
            return this.coinService.getCoinsWithFilter(coinWithFilterDto);
        } else {
            return this.coinService.getCoins();
        }
    }

    @Get('/:id')
    getCoinById(@Param('id') id: string): Coin {
        return this.coinService.getCoinById(id);
    }
}
