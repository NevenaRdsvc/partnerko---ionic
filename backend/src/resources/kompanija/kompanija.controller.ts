import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KompanijaService } from './kompanija.service';
import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';

@Controller('kompanija')
export class KompanijaController {
  constructor(private readonly kompanijaService: KompanijaService) {}

  @Post()
  async create(@Body() createKompanijaDto: CreateKompanijaDto) {
    return await this.kompanijaService.create(createKompanijaDto);
  }

  @Get()
  findAll() {
    return this.kompanijaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kompanijaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKompanijaDto: UpdateKompanijaDto) {
    return this.kompanijaService.update(+id, updateKompanijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kompanijaService.remove(+id);
  }
}
