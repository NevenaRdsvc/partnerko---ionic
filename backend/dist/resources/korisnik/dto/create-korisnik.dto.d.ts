import { TipKorisnika } from "src/enums/tip-korisnika";
export declare class CreateKorisnikDto {
    username: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: TipKorisnika;
    iteracija_id?: number;
}
