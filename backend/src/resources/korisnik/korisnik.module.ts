import { Module } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';
import { KorisnikController } from './korisnik.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KorisnikIteracija } from '../korisnik-iteracija/entities/korisnik-iteracija.entity';
import { Korisnik } from './entities/korisnik.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([KorisnikIteracija, Korisnik, IteracijaProjekta])],
  controllers: [KorisnikController],
  providers: [KorisnikService],
})
export class KorisnikModule {}
