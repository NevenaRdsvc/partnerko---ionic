import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KompanijaIteracijaService } from './kompanija-iteracija.service';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';

@Controller('kompanija/:kompanijaId/iteracija')
export class KompanijaIteracijaController {
  constructor(private readonly kompanijaIteracijaService: KompanijaIteracijaService) {}

  @Post()
  create(@Param('kompanijaId') kompanijaId: number,
  @Body() createKompanijaIteracijaDto: CreateKompanijaIteracijaDto) {
    return this.kompanijaIteracijaService.create(kompanijaId, createKompanijaIteracijaDto);
  }

  @Get()
  findAll() {
    return this.kompanijaIteracijaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kompanijaIteracijaService.findOne(+id);
  }

  @Patch(':iteracijaId')
  update(
    @Param('kompanijaId') kompanijaId: string,
    @Param('iteracijaId') iteracijaId: string,
    @Body() updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto,
  ) {
    return this.kompanijaIteracijaService.update(+kompanijaId, +iteracijaId, updateKompanijaIteracijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kompanijaIteracijaService.remove(+id);
  }
}
