import { Repository } from 'typeorm';
import { KorisnikIteracija } from './entities/korisnik-iteracija.entity';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
export declare class KorisnikIteracijaService {
    private readonly repo;
    constructor(repo: Repository<KorisnikIteracija>);
    create(dto: CreateKorisnikIteracijaDto): Promise<KorisnikIteracija>;
    remove(korisnikId: number, iteracijaId: number): Promise<import("typeorm").DeleteResult>;
}
