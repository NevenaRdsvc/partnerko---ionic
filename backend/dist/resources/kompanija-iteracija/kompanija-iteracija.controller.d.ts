import { KompanijaIteracijaService } from './kompanija-iteracija.service';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
export declare class KompanijaIteracijaController {
    private readonly kompanijaIteracijaService;
    constructor(kompanijaIteracijaService: KompanijaIteracijaService);
    create(kompanijaId: number, createKompanijaIteracijaDto: CreateKompanijaIteracijaDto): Promise<import("./entities/kompanija-iteracija.entity").KompanijaIteracija>;
    findAll(): string;
    findOne(id: string): string;
    update(kompanijaId: string, iteracijaId: string, updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto): Promise<import("./entities/kompanija-iteracija.entity").KompanijaIteracija>;
    remove(id: string): string;
}
