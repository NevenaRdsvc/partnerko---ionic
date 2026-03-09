import { TipKorisnika } from "src/enums/tip-korisnika";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { KorisnikIteracija } from "src/resources/korisnik-iteracija/entities/korisnik-iteracija.entity";
export declare class Korisnik {
    id: number;
    username: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: TipKorisnika;
    refresh_token: string | null;
    ki: KompanijaIteracija[];
    korisnikIteracije: KorisnikIteracija[];
}
