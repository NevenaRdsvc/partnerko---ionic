import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IteracijaProjektaService } from './iteracija-projekta.service';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
import { BatchKompanijaIteracijaDto } from './dto/batch-kompanija-iteracija.dto';
import { NazivProjekta } from 'src/enums/naziv-projekta';
import { TipPartnera } from 'src/enums/tip-partnera';

@Controller('iteracija-projekta')
export class IteracijaProjektaController {
  constructor(
    private readonly iteracijaProjektaService: IteracijaProjektaService,
  ) {}

  @Post()
  create(@Body() createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    return this.iteracijaProjektaService.create(createIteracijaProjektaDto);
  }

  @Get('poslednji')
  findAll(@Query('naziv') naziv: NazivProjekta) {
    return this.iteracijaProjektaService.findLast(naziv);
  }

  @Post(':id/kompanije/batch')
  batchAddKompanije(@Param('id') id: string, @Body() dto: BatchKompanijaIteracijaDto) {
    return this.iteracijaProjektaService.batchAddKompanije(+id, dto);
  }

  @Get(':id/kompanije/dostupne')
  findDostupne(
    @Param('id') id: string,
    @Query('tipPartnera') tipPartnera: TipPartnera,
  ) {
    return this.iteracijaProjektaService.findDostupne(+id, tipPartnera);
  }

  @Get(':id/kompanije')
  findKompanije(
    @Param('id') id: string,
    @Query('tipPartnera') tipPartnera: TipPartnera,
    @Query('status') status?: string,
  ) {
    return this.iteracijaProjektaService.findKompanije(+id, tipPartnera, status);
  }

  @Get('sve')
  findAllByNaziv(@Query('naziv') naziv: NazivProjekta) {
    return this.iteracijaProjektaService.findAllByNaziv(naziv);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iteracijaProjektaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIteracijaProjektaDto: UpdateIteracijaProjektaDto,
  ) {
    return this.iteracijaProjektaService.update(
      +id,
      updateIteracijaProjektaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iteracijaProjektaService.remove(+id);
  }
}
