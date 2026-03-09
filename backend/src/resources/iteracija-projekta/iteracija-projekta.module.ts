import { Module } from '@nestjs/common';
import { IteracijaProjektaService } from './iteracija-projekta.service';
import { IteracijaProjektaController } from './iteracija-projekta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IteracijaProjekta } from './entities/iteracija-projekta.entity';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IteracijaProjekta, KompanijaIteracija, Kompanija, Korisnik])],
  controllers: [IteracijaProjektaController],
  providers: [IteracijaProjektaService],
})
export class IteracijaProjektaModule {}
