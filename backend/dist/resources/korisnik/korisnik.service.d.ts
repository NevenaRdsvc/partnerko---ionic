import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
import { Korisnik } from './entities/korisnik.entity';
import { Repository } from 'typeorm';
import { KorisnikIteracija } from '../korisnik-iteracija/entities/korisnik-iteracija.entity';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
export declare class KorisnikService {
    private readonly korisnikRepository;
    private readonly korisnikIteracijaRepository;
    private readonly iteracijaRepository;
    constructor(korisnikRepository: Repository<Korisnik>, korisnikIteracijaRepository: Repository<KorisnikIteracija>, iteracijaRepository: Repository<IteracijaProjekta>);
    create(createKorisnikDto: CreateKorisnikDto): Promise<Korisnik>;
    findAllByProject(idProjekta: number): Promise<Korisnik[]>;
    findAllNonKompanija(): Promise<Korisnik[]>;
    findOne(id: number): Promise<Korisnik | null>;
    update(id: number, updateKorisnikDto: UpdateKorisnikDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
