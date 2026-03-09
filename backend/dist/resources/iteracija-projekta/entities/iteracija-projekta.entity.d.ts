import { NazivProjekta } from "src/enums/naziv-projekta";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { KorisnikIteracija } from "src/resources/korisnik-iteracija/entities/korisnik-iteracija.entity";
export declare class IteracijaProjekta {
    id: number;
    naziv_projekta: NazivProjekta;
    godina: number;
    korisnikIteracije: KorisnikIteracija[];
    kompanijaIteracije: KompanijaIteracija[];
}
