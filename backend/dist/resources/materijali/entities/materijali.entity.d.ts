import { Kompanija } from 'src/resources/kompanija/entities/kompanija.entity';
export declare class Materijali {
    id: number;
    url: string;
    javniId: string;
    originalnoIme: string;
    imeCloud: string;
    datumKreiranja: Date;
    kompanija_id: number;
    tags: string[];
    kompanija: Kompanija;
}
