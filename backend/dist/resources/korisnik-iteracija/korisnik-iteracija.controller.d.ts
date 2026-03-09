import { KorisnikIteracijaService } from './korisnik-iteracija.service';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
export declare class KorisnikIteracijaController {
    private readonly korisnikIteracijaService;
    constructor(korisnikIteracijaService: KorisnikIteracijaService);
    create(dto: CreateKorisnikIteracijaDto): Promise<import("./entities/korisnik-iteracija.entity").KorisnikIteracija>;
    remove(korisnikId: string, iteracijaId: string): Promise<import("typeorm").DeleteResult>;
}
