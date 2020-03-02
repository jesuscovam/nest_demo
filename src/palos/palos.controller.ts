import { Controller, Post, Body, Get, Param, Delete, Patch, Query } from '@nestjs/common';
import { PalosService } from './palos.service';
import { CreatePaloDto } from './dto/create-palo-dto';
import { Palo, PaloStatus } from './palos.model';
import { GetPalosFilterDto } from './dto/get-palos-filter-dto';

@Controller('palos')
export class PalosController {
    constructor(private palosServices : PalosService) {}

    @Post()
    createPalo(
        @Body() createPaloDto: CreatePaloDto
    ): Palo {
        return this.palosServices.createPalo(createPaloDto);
    }

    @Get()
    getAllPalos(@Query() paloFilterDto: GetPalosFilterDto ): Palo[] {
        if (Object.keys(paloFilterDto).length){
            return this.palosServices.getPalosWithFilter(paloFilterDto);
        } else {        
        return this.palosServices.getAllPalos();
        }
    }

    @Get('/:id')
    getPaloById(@Param('id') id: string): Palo {
        return this.palosServices.getPaloById(id);
    }

    @Delete('/:id')
    deletePalo(@Param('id') id: string): void {
        return this.palosServices.deletePalo(id);
    }

    @Patch('/:id/status')
    updatePaloStatus(
        @Param('id') id: string,
        @Body() status: PaloStatus,
    ): Palo {
        return this.palosServices.updatePaloStatus(id, status);
    }
}
