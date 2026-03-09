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
exports.KorisnikService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const korisnik_entity_1 = require("./entities/korisnik.entity");
const typeorm_2 = require("typeorm");
const tip_korisnika_1 = require("../../enums/tip-korisnika");
const korisnik_iteracija_entity_1 = require("../korisnik-iteracija/entities/korisnik-iteracija.entity");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
let KorisnikService = class KorisnikService {
    constructor(korisnikRepository, korisnikIteracijaRepository, iteracijaRepository) {
        this.korisnikRepository = korisnikRepository;
        this.korisnikIteracijaRepository = korisnikIteracijaRepository;
        this.iteracijaRepository = iteracijaRepository;
    }
    async create(createKorisnikDto) {
        const { iteracija_id, ...korisnikData } = createKorisnikDto;
        const existing = await this.korisnikRepository.findOneBy({ username: korisnikData.username });
        if (existing)
            throw new common_1.ConflictException('Korisnik je već kreiran u bazi.');
        const korisnik = this.korisnikRepository.create(korisnikData);
        if (korisnik.tip !== tip_korisnika_1.TipKorisnika.ADMIN) {
            if (!iteracija_id) {
                throw new common_1.BadRequestException('Morate izabrati projekat.');
            }
            const iteracija = await this.iteracijaRepository.findOne({
                where: { id: iteracija_id }
            });
            if (!iteracija) {
                throw new common_1.BadRequestException('Projekat ne postoji.');
            }
            const sacuvanKorisnik = await this.korisnikRepository.save(korisnik);
            const veza = this.korisnikIteracijaRepository.create({
                korisnik_id: sacuvanKorisnik.id,
                iteracija_id: iteracija_id
            });
            await this.korisnikIteracijaRepository.save(veza);
            return sacuvanKorisnik;
        }
        return await this.korisnikRepository.save(korisnik);
    }
    async findAllByProject(idProjekta) {
        return await this.korisnikRepository.find({
            relations: { korisnikIteracije: true },
            where: { korisnikIteracije: { iteracija_id: idProjekta },
            },
        });
    }
    async findAllNonKompanija() {
        return await this.korisnikRepository.find({
            where: [
                { tip: tip_korisnika_1.TipKorisnika.ADMIN },
                { tip: tip_korisnika_1.TipKorisnika.KOORDINATOR },
                { tip: tip_korisnika_1.TipKorisnika.CLAN },
            ],
            select: ['id', 'ime', 'prezime', 'username', 'tip'],
        });
    }
    async findOne(id) {
        return await this.korisnikRepository.findOneBy({ id });
    }
    update(id, updateKorisnikDto) {
        return `This action updates a #${id} korisnik`;
    }
    async remove(id) {
        return await this.korisnikRepository.delete(id);
    }
};
exports.KorisnikService = KorisnikService;
exports.KorisnikService = KorisnikService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(korisnik_entity_1.Korisnik)),
    __param(1, (0, typeorm_1.InjectRepository)(korisnik_iteracija_entity_1.KorisnikIteracija)),
    __param(2, (0, typeorm_1.InjectRepository)(iteracija_projekta_entity_1.IteracijaProjekta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], KorisnikService);
//# sourceMappingURL=korisnik.service.js.map