import { TipPartnera } from "src/enums/tip-partnera";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
export declare class Kompanija {
    id: number;
    naziv: string;
    websajt: string;
    kontakt: string;
    tip: TipPartnera;
    kompanijaIteracije: KompanijaIteracija[];
}
