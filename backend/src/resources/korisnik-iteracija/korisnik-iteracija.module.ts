import { Module } from '@nestjs/common';
import { KorisnikIteracijaService } from './korisnik-iteracija.service';
import { KorisnikIteracijaController } from './korisnik-iteracija.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KorisnikIteracija } from './entities/korisnik-iteracija.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([KorisnikIteracija, Korisnik, IteracijaProjekta])],
  controllers: [KorisnikIteracijaController],
  providers: [KorisnikIteracijaService],
})
export class KorisnikIteracijaModule {}
