import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
import { KompanijaIteracija } from './entities/kompanija-iteracija.entity';
import { Repository } from 'typeorm/repository/Repository';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';
export declare class KompanijaIteracijaService {
    private readonly kompanijaIteracijaRepository;
    private readonly korisnikRepository;
    private readonly iteracijaRepository;
    private readonly kompanijaRepository;
    constructor(kompanijaIteracijaRepository: Repository<KompanijaIteracija>, korisnikRepository: Repository<Korisnik>, iteracijaRepository: Repository<IteracijaProjekta>, kompanijaRepository: Repository<Kompanija>);
    create(kompanijaId: number, createKompanijaIteracijaDto: CreateKompanijaIteracijaDto): Promise<KompanijaIteracija>;
    findAll(): string;
    findOne(id: number): string;
    update(kompanijaId: number, iteracijaId: number, dto: UpdateKompanijaIteracijaDto): Promise<KompanijaIteracija>;
    remove(id: number): string;
}
