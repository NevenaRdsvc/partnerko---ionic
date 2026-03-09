import { IteracijaProjektaService } from './iteracija-projekta.service';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
import { BatchKompanijaIteracijaDto } from './dto/batch-kompanija-iteracija.dto';
import { NazivProjekta } from 'src/enums/naziv-projekta';
import { TipPartnera } from 'src/enums/tip-partnera';
export declare class IteracijaProjektaController {
    private readonly iteracijaProjektaService;
    constructor(iteracijaProjektaService: IteracijaProjektaService);
    create(createIteracijaProjektaDto: CreateIteracijaProjektaDto): Promise<import("./entities/iteracija-projekta.entity").IteracijaProjekta>;
    findAll(naziv: NazivProjekta): Promise<import("./entities/iteracija-projekta.entity").IteracijaProjekta | null>;
    batchAddKompanije(id: string, dto: BatchKompanijaIteracijaDto): Promise<import("../kompanija-iteracija/entities/kompanija-iteracija.entity").KompanijaIteracija[]>;
    findDostupne(id: string, tipPartnera: TipPartnera): Promise<{
        brojCimanja: number;
        brojOdobravanja: number;
        brojOdbijanja: number;
        napomene: string[];
        id: number;
        naziv: string;
        websajt: string;
        kontakt: string;
        tip: TipPartnera;
        kompanijaIteracije: import("../kompanija-iteracija/entities/kompanija-iteracija.entity").KompanijaIteracija[];
    }[]>;
    findKompanije(id: string, tipPartnera: TipPartnera, status?: string): Promise<{
        ID: number;
        naziv: string;
        websajt: string;
        kontakt: string;
        zaduzen: string | null;
        korisnikId: number;
        datumCimanja: Date;
        datumPodsetnik: Date;
        datumPoziva: Date;
        odobreno: boolean | null;
        stanje: string;
        napomena: string;
        brojCimanja: number;
        brojOdobravanja: number;
        brojOdbijanja: number;
    }[]>;
    findAllByNaziv(naziv: NazivProjekta): Promise<import("./entities/iteracija-projekta.entity").IteracijaProjekta[]>;
    findOne(id: string): Promise<import("./entities/iteracija-projekta.entity").IteracijaProjekta | null>;
    update(id: string, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto): string;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
