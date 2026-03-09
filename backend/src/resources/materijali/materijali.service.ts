import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  InjectRepository
} from '@nestjs/typeorm';
import {
  Repository
} from 'typeorm';
import {
  Materijali
} from './entities/materijali.entity';
import {
  CloudinaryService
} from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MaterijaliService {
  constructor(
    @InjectRepository(Materijali) private readonly materijaliRepository: Repository < Materijali > ,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadMaterijal(
    file: Express.Multer.File,
    kompanija_id: string,
  ) {
    const uploaded = await this.cloudinaryService.uploadFile(file);

    const materijal = this.materijaliRepository.create({
      url: uploaded.url,
      javniId: uploaded.publicId,
      originalnoIme: uploaded.originalName,
      imeCloud: uploaded.displayName,
      kompanija_id: Number(kompanija_id),
      tags: uploaded.tags,
    });

    return await this.materijaliRepository.save(materijal);
  }

  async findAll(search ? : string) {
    const qb = this.materijaliRepository.createQueryBuilder('m')
      .leftJoinAndSelect('m.kompanija', 'k')
      .orderBy('k.naziv', 'ASC')
      .addOrderBy('m.datumKreiranja', 'DESC');

    if (search) {
      qb.where(
        'k.naziv ILIKE :s OR m."originalnoIme" ILIKE :s OR m.tags ILIKE :s', {
          s: `%${search}%`
        },
      );
    }

    return await qb.getMany();
  }

  async findKompanije() {
    return await this.materijaliRepository
      .createQueryBuilder('m')
      .select('k.id', 'id')
      .addSelect('k.naziv', 'naziv')
      .leftJoin('m.kompanija', 'k')
      .groupBy('k.id')
      .addGroupBy('k.naziv')
      .orderBy('k.naziv', 'ASC')
      .getRawMany();
  }

  async syncTags() {
    const cloudinaryResources = await this.cloudinaryService.getAllResourceTags();
    const tagMap = new Map(cloudinaryResources.map(r => [r.publicId, r.tags]));

    const all = await this.materijaliRepository.find();
    let updated = 0;

    for (const m of all) {
      const tags = tagMap.get(m.javniId);
      if (tags !== undefined) {
        m.tags = tags;
        await this.materijaliRepository.save(m);
        updated++;
      }
    }

    return {
      message: `Sinkronizirano ${updated} materijala.`,
      updated
    };
  }

  async remove(id: number) {
    const materijal = await this.materijaliRepository.findOneBy({
      id
    });
    if (!materijal) throw new NotFoundException('Materijal nije pronađen.');

    await this.cloudinaryService.deleteFile(materijal.javniId, materijal.url);
    await this.materijaliRepository.delete(id);

    return {
      message: 'Materijal je uspešno obrisan.'
    };
  }
}
