import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnik } from './entities/korisnik.entity';
import { Repository } from 'typeorm';
import { TipKorisnika } from 'src/enums/tip-korisnika';
import { KorisnikIteracija } from '../korisnik-iteracija/entities/korisnik-iteracija.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';

@Injectable()
export class KorisnikService {

  constructor(
    @InjectRepository(Korisnik) private readonly korisnikRepository:Repository<Korisnik>,
    @InjectRepository(KorisnikIteracija) private readonly korisnikIteracijaRepository: Repository<KorisnikIteracija>,
    @InjectRepository(IteracijaProjekta) private readonly iteracijaRepository: Repository<IteracijaProjekta>
  ) 
  {}

  async create(createKorisnikDto: CreateKorisnikDto) {

    const { iteracija_id, ...korisnikData } = createKorisnikDto;

    const existing = await this.korisnikRepository.findOneBy({ username: korisnikData.username });
    if (existing) throw new ConflictException('Korisnik je već kreiran u bazi.');

    const korisnik = this.korisnikRepository.create(korisnikData);

    if (korisnik.tip !== TipKorisnika.ADMIN) {

        if (!iteracija_id) {
            throw new BadRequestException('Morate izabrati projekat.');
        }

        const iteracija = await this.iteracijaRepository.findOne({
            where: { id: iteracija_id }
        });

        if (!iteracija) {
            throw new BadRequestException('Projekat ne postoji.');
        }

        const sacuvanKorisnik = await this.korisnikRepository.save(korisnik);

        const veza = this.korisnikIteracijaRepository.create({
            korisnik_id: sacuvanKorisnik.id,
            iteracija_id: iteracija_id
        });

        await this.korisnikIteracijaRepository.save(veza);

        return sacuvanKorisnik;
    }

    return await this.korisnikRepository.save(korisnik);
  }

  async findAllByProject(idProjekta: number) {
    return await this.korisnikRepository.find({
      relations: {korisnikIteracije: true},
      where: {korisnikIteracije: {iteracija_id: idProjekta},
      },},
  );
  }

  async findAllNonKompanija() {
    return await this.korisnikRepository.find({
      where: [
        { tip: TipKorisnika.ADMIN },
        { tip: TipKorisnika.KOORDINATOR },
        { tip: TipKorisnika.CLAN },
      ],
      select: ['id', 'ime', 'prezime', 'username', 'tip'],
    });
  }

  async findOne(id: number) {
    return await this.korisnikRepository.findOneBy({id});
  }

  update(id: number, updateKorisnikDto: UpdateKorisnikDto) {
    return `This action updates a #${id} korisnik`;
  }

  async remove(id: number) {
    return await this.korisnikRepository.delete(id);
  }
}