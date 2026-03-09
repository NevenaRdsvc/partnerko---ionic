import { KompanijaService } from './kompanija.service';
import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';
export declare class KompanijaController {
    private readonly kompanijaService;
    constructor(kompanijaService: KompanijaService);
    create(createKompanijaDto: CreateKompanijaDto): Promise<import("./entities/kompanija.entity").Kompanija>;
    findAll(): Promise<import("./entities/kompanija.entity").Kompanija[]>;
    findOne(id: string): string;
    update(id: string, updateKompanijaDto: UpdateKompanijaDto): Promise<import("./entities/kompanija.entity").Kompanija>;
    remove(id: string): string;
}
