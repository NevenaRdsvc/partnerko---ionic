import { MaterijaliService } from './materijali.service';
import { CreateMaterijaliDto } from './dto/create-materijali.dto';
export declare class MaterijaliController {
    private readonly materijaliService;
    constructor(materijaliService: MaterijaliService);
    upload(file: Express.Multer.File, body: CreateMaterijaliDto): Promise<import("./entities/materijali.entity").Materijali>;
    findAll(search?: string): Promise<import("./entities/materijali.entity").Materijali[]>;
    findKompanije(): Promise<any[]>;
    syncTags(): Promise<{
        message: string;
        updated: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
