import { Module } from '@nestjs/common';
import { KompanijaIteracijaService } from './kompanija-iteracija.service';
import { KompanijaIteracijaController } from './kompanija-iteracija.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KompanijaIteracija } from './entities/kompanija-iteracija.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';

@Module({
  imports:[TypeOrmModule.forFeature([KompanijaIteracija, Kompanija, IteracijaProjekta, Korisnik])],
  controllers: [KompanijaIteracijaController],
  providers: [KompanijaIteracijaService],
})
export class KompanijaIteracijaModule {}
