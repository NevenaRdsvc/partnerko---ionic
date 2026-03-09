import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
import { KompanijaIteracija } from './entities/kompanija-iteracija.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';

@Injectable()
export class KompanijaIteracijaService {

  constructor(
    @InjectRepository(KompanijaIteracija) private readonly kompanijaIteracijaRepository: Repository<KompanijaIteracija>,
    @InjectRepository(Korisnik) private readonly korisnikRepository: Repository<Korisnik>,
    @InjectRepository(IteracijaProjekta) private readonly iteracijaRepository: Repository<IteracijaProjekta>,
    @InjectRepository(Kompanija) private readonly kompanijaRepository: Repository<Kompanija>
  ) {}

  create(kompanijaId: number, createKompanijaIteracijaDto: CreateKompanijaIteracijaDto) {
    const kompanijaIteracija = this.kompanijaIteracijaRepository.create({
      iteracija: { id: createKompanijaIteracijaDto.iteracija_id },
      kompanija: { id: kompanijaId },
      tip_partnera: createKompanijaIteracijaDto.tip_partnera,
      korisnik: { id: createKompanijaIteracijaDto.korisnik_id }
    });
    return this.kompanijaIteracijaRepository.save(kompanijaIteracija);
  }

  findAll() {
    return `This action returns all kompanijaIteracija`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kompanijaIteracija`;
  }

  async update(kompanijaId: number, iteracijaId: number, dto: UpdateKompanijaIteracijaDto) {
    const record = await this.kompanijaIteracijaRepository.findOne({
      where: { kompanija_id: kompanijaId, iteracija_id: iteracijaId },
    });
    if (!record) throw new NotFoundException('Zapis nije pronađen.');

    const { korisnik_id, stanje, ...rest } = dto;

    Object.assign(record, rest);

    if (stanje !== undefined) {
      record.stanje = stanje;

      if (stanje === 'Odobreno') record.odobrena = true;
      else if (stanje === 'Odbijeno') record.odobrena = false;
      else record.odobrena = null;

      const today = new Date();
      if (stanje === 'Poslat email') record.datum_cimanja = today;
      if (stanje === 'Poslat podsetnik') record.datum_podsetnik = today;
      if (stanje === 'Poziv') record.datum_poziv = today;
    }

    if (korisnik_id !== undefined) {
      record.korisnik = { id: korisnik_id } as Korisnik;
    }

    return await this.kompanijaIteracijaRepository.save(record);
  }

  remove(id: number) {
    return `This action removes a #${id} kompanijaIteracija`;
  }
}
