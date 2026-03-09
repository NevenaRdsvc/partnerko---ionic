"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterijaliService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const materijali_entity_1 = require("./entities/materijali.entity");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let MaterijaliService = class MaterijaliService {
    constructor(materijaliRepository, cloudinaryService) {
        this.materijaliRepository = materijaliRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadMaterijal(file, kompanija_id) {
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
    async findAll(search) {
        const qb = this.materijaliRepository.createQueryBuilder('m')
            .leftJoinAndSelect('m.kompanija', 'k')
            .orderBy('k.naziv', 'ASC')
            .addOrderBy('m.datumKreiranja', 'DESC');
        if (search) {
            qb.where('k.naziv ILIKE :s OR m."originalnoIme" ILIKE :s OR m.tags ILIKE :s', {
                s: `%${search}%`
            });
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
    async remove(id) {
        const materijal = await this.materijaliRepository.findOneBy({
            id
        });
        if (!materijal)
            throw new common_1.NotFoundException('Materijal nije pronađen.');
        await this.cloudinaryService.deleteFile(materijal.javniId, materijal.url);
        await this.materijaliRepository.delete(id);
        return {
            message: 'Materijal je uspešno obrisan.'
        };
    }
};
exports.MaterijaliService = MaterijaliService;
exports.MaterijaliService = MaterijaliService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(materijali_entity_1.Materijali)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], MaterijaliService);
//# sourceMappingURL=materijali.service.js.map