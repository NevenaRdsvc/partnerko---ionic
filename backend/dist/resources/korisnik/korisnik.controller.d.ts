import { KorisnikService } from './korisnik.service';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
export declare class KorisnikController {
    private readonly korisnikService;
    constructor(korisnikService: KorisnikService);
    create(createKorisnikDto: CreateKorisnikDto): Promise<import("./entities/korisnik.entity").Korisnik>;
    findAll(idProjekta: string): Promise<import("./entities/korisnik.entity").Korisnik[]>;
    findAllNonKompanija(): Promise<import("./entities/korisnik.entity").Korisnik[]>;
    update(id: string, updateKorisnikDto: UpdateKorisnikDto): string;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
