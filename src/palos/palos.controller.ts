import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PalosService } from './palos.service';
import { CreatePaloDto } from './dto/create-palo-dto';
import { Palo } from './palos.model';

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
    getAllPalos(): Palo[] {
        return this.palosServices.getAllPalos();
    }

    @Get('/:id')
    getPaloById(@Param('id') id: string): Palo {
        return this.palosServices.getPaloById(id);
    }

    @Delete('/:id')
    deletePalo(@Param('id') id: string): void {
        return this.palosServices.deletePalo(id);
    }
}
