import { Injectable } from '@nestjs/common';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IteracijaProjekta } from './entities/iteracija-projekta.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NazivProjekta } from 'src/enums/naziv-projekta';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';
import { TipPartnera } from 'src/enums/tip-partnera';
import { BatchKompanijaIteracijaDto } from './dto/batch-kompanija-iteracija.dto';

@Injectable()
export class IteracijaProjektaService {

  constructor(
    @InjectRepository(IteracijaProjekta) private readonly iteracijaProjektaRepository: Repository<IteracijaProjekta>,
    @InjectRepository(KompanijaIteracija) private readonly kompanijaIteracijaRepository: Repository<KompanijaIteracija>,
    @InjectRepository(Kompanija) private readonly kompanijaRepository: Repository<Kompanija>,
  ) {}
  
  create(createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    const iteracijaProjekta = this.iteracijaProjektaRepository.create(createIteracijaProjektaDto);
    return this.iteracijaProjektaRepository.save(iteracijaProjekta);
  }

  async findLast(naziv: NazivProjekta) {
    return await this.iteracijaProjektaRepository.findOne({
      where: { naziv_projekta: naziv },
      order: { godina: 'DESC' }
    });
  }

  async findAllByNaziv(naziv: NazivProjekta) {
    return await this.iteracijaProjektaRepository.find({
      where: { naziv_projekta: naziv },
      order: { godina: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.iteracijaProjektaRepository.findOneBy({ id });
  }

  update(id: number, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto) {
    return `This action updates a #${id} iteracijaProjekta`;
  }

  async remove(id: number) {
    return await this.iteracijaProjektaRepository.delete(id);
  }

  async batchAddKompanije(iteracijaId: number, dto: BatchKompanijaIteracijaDto) {
    const records = dto.kompanija_ids.map(kompanija_id =>
      this.kompanijaIteracijaRepository.create({
        kompanija_id,
        iteracija_id: iteracijaId,
        tip_partnera: dto.tip_partnera,
      }),
    );
    return await this.kompanijaIteracijaRepository.save(records);
  }

  async findDostupne(iteracijaId: number, tipPartnera: TipPartnera) {
    const vecDodane = await this.kompanijaIteracijaRepository.find({
      where: { iteracija_id: iteracijaId, tip_partnera: tipPartnera },
      select: ['kompanija_id'],
    });
    const dodaneIds = vecDodane.map(ki => ki.kompanija_id);

    const qb = this.kompanijaRepository
      .createQueryBuilder('k')
      .where('k.tip = :tip', { tip: tipPartnera })
      .orderBy('k.naziv', 'ASC');

    if (dodaneIds.length > 0) {
      qb.andWhere('k.id NOT IN (:...ids)', { ids: dodaneIds });
    }
    const kompanije = await qb.getMany();

    if (kompanije.length === 0) return [];

    const kompanijaIds = kompanije.map(k => k.id);

    const [stats, napomenaRows] = await Promise.all([
      this.kompanijaIteracijaRepository
        .createQueryBuilder('ki')
        .select('ki.kompanija_id', 'kompanijaId')
        .addSelect('COUNT(CASE WHEN ki.datum_cimanja IS NOT NULL THEN 1 END)', 'brojCimanja')
        .addSelect('COUNT(CASE WHEN ki.odobrena = true THEN 1 END)', 'brojOdobravanja')
        .addSelect('COUNT(CASE WHEN ki.odobrena = false THEN 1 END)', 'brojOdbijanja')
        .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
        .groupBy('ki.kompanija_id')
        .getRawMany(),

      this.kompanijaIteracijaRepository
        .createQueryBuilder('ki')
        .select('ki.kompanija_id', 'kompanijaId')
        .addSelect('ki.napomena', 'napomena')
        .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
        .andWhere('ki.napomena IS NOT NULL')
        .andWhere("ki.napomena <> ''")
        .orderBy('ki.iteracija_id', 'ASC')
        .getRawMany(),
    ]);

    const statsMap = new Map(stats.map(s => [Number(s.kompanijaId), s]));

    const napomeneMap = new Map<number, string[]>();
    for (const row of napomenaRows) {
      const id = Number(row.kompanijaId);
      if (!napomeneMap.has(id)) napomeneMap.set(id, []);
      napomeneMap.get(id)!.push(row.napomena);
    }

    return kompanije.map(k => {
      const s = statsMap.get(k.id);
      return {
        ...k,
        brojCimanja: Number(s?.brojCimanja ?? 0),
        brojOdobravanja: Number(s?.brojOdobravanja ?? 0),
        brojOdbijanja: Number(s?.brojOdbijanja ?? 0),
        napomene: napomeneMap.get(k.id) ?? [],
      };
    });
  }

  async findKompanije(iteracijaId: number, tipPartnera: TipPartnera, status?: string) {
    const where: any = { iteracija_id: iteracijaId, tip_partnera: tipPartnera };

    if (status?.startsWith('potvrdje')) where.odobrena = true;
    else if (status?.startsWith('odbije')) where.odobrena = false;

    const items = await this.kompanijaIteracijaRepository.find({
      where,
      relations: { kompanija: true, korisnik: true },
    });

    if (items.length === 0) return [];

    const kompanijaIds = items.map(i => i.kompanija_id);

    const stats = await this.kompanijaIteracijaRepository
      .createQueryBuilder('ki')
      .select('ki.kompanija_id', 'kompanijaId')
      .addSelect('COUNT(CASE WHEN ki.datum_cimanja IS NOT NULL THEN 1 END)', 'brojCimanja')
      .addSelect('COUNT(CASE WHEN ki.odobrena = true THEN 1 END)', 'brojOdobravanja')
      .addSelect('COUNT(CASE WHEN ki.odobrena = false THEN 1 END)', 'brojOdbijanja')
      .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
      .groupBy('ki.kompanija_id')
      .getRawMany();

    const statsMap = new Map(stats.map(s => [Number(s.kompanijaId), s]));

    return items.map(item => {
      const s = statsMap.get(item.kompanija.id);
      return {
        ID: item.kompanija.id,
        naziv: item.kompanija.naziv,
        websajt: item.kompanija.websajt,
        kontakt: item.kompanija.kontakt,
        zaduzen: item.korisnik ? `${item.korisnik.ime} ${item.korisnik.prezime}` : null,
        korisnikId: item.korisnik?.id ?? null,
        datumCimanja: item.datum_cimanja,
        datumPodsetnik: item.datum_podsetnik,
        datumPoziva: item.datum_poziv,
        odobreno: item.odobrena,
        stanje: item.stanje ?? (item.odobrena === true ? 'Odobreno' : item.odobrena === false ? 'Odbijeno' : 'Nije dodeljeno'),
        napomena: item.napomena ?? '',
        brojCimanja: Number(s?.brojCimanja ?? 0),
        brojOdobravanja: Number(s?.brojOdobravanja ?? 0),
        brojOdbijanja: Number(s?.brojOdbijanja ?? 0),
      };
    });
  }
}
