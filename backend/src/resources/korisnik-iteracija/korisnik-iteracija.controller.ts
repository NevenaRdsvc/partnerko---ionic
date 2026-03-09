import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { KorisnikIteracijaService } from './korisnik-iteracija.service';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';

@Controller('korisnik-iteracija')
export class KorisnikIteracijaController {
  constructor(private readonly korisnikIteracijaService: KorisnikIteracijaService) {}

  @Post()
  create(@Body() dto: CreateKorisnikIteracijaDto) {
    return this.korisnikIteracijaService.create(dto);
  }

  @Delete(':korisnikId/:iteracijaId')
  remove(
    @Param('korisnikId') korisnikId: string,
    @Param('iteracijaId') iteracijaId: string,
  ) {
    return this.korisnikIteracijaService.remove(+korisnikId, +iteracijaId);
  }
}
