import { Controller, Post, UsePipes, ValidationPipe, Get, Query, Param, Delete, Patch } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dtos/create-coin-dto';
import { Coin, CoinStatus } from './coin.model';
import { CoinsWithFilterDto } from './dtos/coins-with-filter-dto';
import { CoinValidationPipe } from './pipes/coins-transform-pipe';

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

    @Delete('/:id')
    deleteCoin(@Param('id') id:string): void {
        this.coinService.deleteCoin(id);
    }

    @Patch('/:id/status')
    updateCoinStatus(
        @Param('id') id: string,
        @Query('status', CoinValidationPipe) status: CoinStatus): Coin {
        return this.coinService.updateCoinStatus(id, status);
    }
}
