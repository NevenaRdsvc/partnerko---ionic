import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
export declare class KorisnikIteracija {
    korisnik_id: number;
    korisnik: Korisnik;
    iteracija_id: number;
    iteracija: IteracijaProjekta;
}
