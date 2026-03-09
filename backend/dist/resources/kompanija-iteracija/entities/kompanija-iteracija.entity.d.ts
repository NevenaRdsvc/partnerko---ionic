import { TipPartnera } from "src/enums/tip-partnera";
import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Kompanija } from "src/resources/kompanija/entities/kompanija.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
export declare class KompanijaIteracija {
    kompanija_id: number;
    kompanija: Kompanija;
    iteracija_id: number;
    iteracija: IteracijaProjekta;
    tip_partnera: TipPartnera;
    datum_cimanja: Date;
    datum_podsetnik: Date;
    datum_poziv: Date;
    odobrena: boolean | null;
    stanje: string;
    napomena: string;
    korisnik: Korisnik;
}
