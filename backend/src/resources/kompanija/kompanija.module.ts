import { Module } from '@nestjs/common';
import { KompanijaService } from './kompanija.service';
import { KompanijaController } from './kompanija.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kompanija } from './entities/kompanija.entity';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Kompanija, KompanijaIteracija, IteracijaProjekta, Korisnik])],
  controllers: [KompanijaController],
  providers: [KompanijaService],
})
export class KompanijaModule {}
