import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KorisnikIteracija } from './entities/korisnik-iteracija.entity';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';

@Injectable()
export class KorisnikIteracijaService {
  constructor(
    @InjectRepository(KorisnikIteracija)
    private readonly repo: Repository<KorisnikIteracija>,
  ) {}

  async create(dto: CreateKorisnikIteracijaDto) {
    const existing = await this.repo.findOne({
      where: { korisnik_id: dto.korisnik_id, iteracija_id: dto.iteracija_id },
    });
    if (existing) throw new ConflictException('Korisnik je već dodat na ovu iteraciju.');

    const record = this.repo.create({
      korisnik_id: dto.korisnik_id,
      iteracija_id: dto.iteracija_id,
    });
    return await this.repo.save(record);
  }

  async remove(korisnikId: number, iteracijaId: number) {
    const record = await this.repo.findOne({
      where: { korisnik_id: korisnikId, iteracija_id: iteracijaId },
    });
    if (!record) throw new NotFoundException('Veza nije pronađena.');
    return await this.repo.delete({ korisnik_id: korisnikId, iteracija_id: iteracijaId });
  }
}
