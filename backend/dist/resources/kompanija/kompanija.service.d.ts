import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Repository } from 'typeorm/repository/Repository';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { Kompanija } from './entities/kompanija.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
export declare class KompanijaService {
    private readonly kompanijaRepository;
    private readonly kompanijaIteracijaRepository;
    private readonly iteracijaRepository;
    private readonly korisnikRepository;
    constructor(kompanijaRepository: Repository<Kompanija>, kompanijaIteracijaRepository: Repository<KompanijaIteracija>, iteracijaRepository: Repository<IteracijaProjekta>, korisnikRepository: Repository<Korisnik>);
    create(createKompanijaDto: CreateKompanijaDto): Promise<Kompanija>;
    findAll(): Promise<Kompanija[]>;
    findOne(id: number): string;
    update(id: number, updateKompanijaDto: UpdateKompanijaDto): Promise<Kompanija>;
    remove(id: number): string;
}
