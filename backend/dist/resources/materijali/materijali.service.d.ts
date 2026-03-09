import { Repository } from 'typeorm';
import { Materijali } from './entities/materijali.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class MaterijaliService {
    private readonly materijaliRepository;
    private readonly cloudinaryService;
    constructor(materijaliRepository: Repository<Materijali>, cloudinaryService: CloudinaryService);
    uploadMaterijal(file: Express.Multer.File, kompanija_id: string): Promise<Materijali>;
    findAll(search?: string): Promise<Materijali[]>;
    findKompanije(): Promise<any[]>;
    syncTags(): Promise<{
        message: string;
        updated: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
