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
exports.IteracijaProjektaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const iteracija_projekta_entity_1 = require("./entities/iteracija-projekta.entity");
const Repository_1 = require("typeorm/repository/Repository");
const kompanija_iteracija_entity_1 = require("../kompanija-iteracija/entities/kompanija-iteracija.entity");
const kompanija_entity_1 = require("../kompanija/entities/kompanija.entity");
let IteracijaProjektaService = class IteracijaProjektaService {
    constructor(iteracijaProjektaRepository, kompanijaIteracijaRepository, kompanijaRepository) {
        this.iteracijaProjektaRepository = iteracijaProjektaRepository;
        this.kompanijaIteracijaRepository = kompanijaIteracijaRepository;
        this.kompanijaRepository = kompanijaRepository;
    }
    create(createIteracijaProjektaDto) {
        const iteracijaProjekta = this.iteracijaProjektaRepository.create(createIteracijaProjektaDto);
        return this.iteracijaProjektaRepository.save(iteracijaProjekta);
    }
    async findLast(naziv) {
        return await this.iteracijaProjektaRepository.findOne({
            where: { naziv_projekta: naziv },
            order: { godina: 'DESC' }
        });
    }
    async findAllByNaziv(naziv) {
        return await this.iteracijaProjektaRepository.find({
            where: { naziv_projekta: naziv },
            order: { godina: 'DESC' },
        });
    }
    async findOne(id) {
        return await this.iteracijaProjektaRepository.findOneBy({ id });
    }
    update(id, updateIteracijaProjektaDto) {
        return `This action updates a #${id} iteracijaProjekta`;
    }
    async remove(id) {
        return await this.iteracijaProjektaRepository.delete(id);
    }
    async batchAddKompanije(iteracijaId, dto) {
        const records = dto.kompanija_ids.map(kompanija_id => this.kompanijaIteracijaRepository.create({
            kompanija_id,
            iteracija_id: iteracijaId,
            tip_partnera: dto.tip_partnera,
        }));
        return await this.kompanijaIteracijaRepository.save(records);
    }
    async findDostupne(iteracijaId, tipPartnera) {
        const vecDodane = await this.kompanijaIteracijaRepository.find({
            where: { iteracija_id: iteracijaId, tip_partnera: tipPartnera },
            select: ['kompanija_id'],
        });
        const dodaneIds = vecDodane.map(ki => ki.kompanija_id);
        const qb = this.kompanijaRepository
            .createQueryBuilder('k')
            .where('k.tip = :tip', { tip: tipPartnera })
            .orderBy('k.naziv', 'ASC');
        if (dodaneIds.length > 0) {
            qb.andWhere('k.id NOT IN (:...ids)', { ids: dodaneIds });
        }
        const kompanije = await qb.getMany();
        if (kompanije.length === 0)
            return [];
        const kompanijaIds = kompanije.map(k => k.id);
        const [stats, napomenaRows] = await Promise.all([
            this.kompanijaIteracijaRepository
                .createQueryBuilder('ki')
                .select('ki.kompanija_id', 'kompanijaId')
                .addSelect('COUNT(CASE WHEN ki.datum_cimanja IS NOT NULL THEN 1 END)', 'brojCimanja')
                .addSelect('COUNT(CASE WHEN ki.odobrena = true THEN 1 END)', 'brojOdobravanja')
                .addSelect('COUNT(CASE WHEN ki.odobrena = false THEN 1 END)', 'brojOdbijanja')
                .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
                .groupBy('ki.kompanija_id')
                .getRawMany(),
            this.kompanijaIteracijaRepository
                .createQueryBuilder('ki')
                .select('ki.kompanija_id', 'kompanijaId')
                .addSelect('ki.napomena', 'napomena')
                .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
                .andWhere('ki.napomena IS NOT NULL')
                .andWhere("ki.napomena <> ''")
                .orderBy('ki.iteracija_id', 'ASC')
                .getRawMany(),
        ]);
        const statsMap = new Map(stats.map(s => [Number(s.kompanijaId), s]));
        const napomeneMap = new Map();
        for (const row of napomenaRows) {
            const id = Number(row.kompanijaId);
            if (!napomeneMap.has(id))
                napomeneMap.set(id, []);
            napomeneMap.get(id).push(row.napomena);
        }
        return kompanije.map(k => {
            const s = statsMap.get(k.id);
            return {
                ...k,
                brojCimanja: Number(s?.brojCimanja ?? 0),
                brojOdobravanja: Number(s?.brojOdobravanja ?? 0),
                brojOdbijanja: Number(s?.brojOdbijanja ?? 0),
                napomene: napomeneMap.get(k.id) ?? [],
            };
        });
    }
    async findKompanije(iteracijaId, tipPartnera, status) {
        const where = { iteracija_id: iteracijaId, tip_partnera: tipPartnera };
        if (status?.startsWith('potvrdje'))
            where.odobrena = true;
        else if (status?.startsWith('odbije'))
            where.odobrena = false;
        const items = await this.kompanijaIteracijaRepository.find({
            where,
            relations: { kompanija: true, korisnik: true },
        });
        if (items.length === 0)
            return [];
        const kompanijaIds = items.map(i => i.kompanija_id);
        const stats = await this.kompanijaIteracijaRepository
            .createQueryBuilder('ki')
            .select('ki.kompanija_id', 'kompanijaId')
            .addSelect('COUNT(CASE WHEN ki.datum_cimanja IS NOT NULL THEN 1 END)', 'brojCimanja')
            .addSelect('COUNT(CASE WHEN ki.odobrena = true THEN 1 END)', 'brojOdobravanja')
            .addSelect('COUNT(CASE WHEN ki.odobrena = false THEN 1 END)', 'brojOdbijanja')
            .where('ki.kompanija_id IN (:...ids)', { ids: kompanijaIds })
            .groupBy('ki.kompanija_id')
            .getRawMany();
        const statsMap = new Map(stats.map(s => [Number(s.kompanijaId), s]));
        return items.map(item => {
            const s = statsMap.get(item.kompanija.id);
            return {
                ID: item.kompanija.id,
                naziv: item.kompanija.naziv,
                websajt: item.kompanija.websajt,
                kontakt: item.kompanija.kontakt,
                zaduzen: item.korisnik ? `${item.korisnik.ime} ${item.korisnik.prezime}` : null,
                korisnikId: item.korisnik?.id ?? null,
                datumCimanja: item.datum_cimanja,
                datumPodsetnik: item.datum_podsetnik,
                datumPoziva: item.datum_poziv,
                odobreno: item.odobrena,
                stanje: item.stanje ?? (item.odobrena === true ? 'Odobreno' : item.odobrena === false ? 'Odbijeno' : 'Nije dodeljeno'),
                napomena: item.napomena ?? '',
                brojCimanja: Number(s?.brojCimanja ?? 0),
                brojOdobravanja: Number(s?.brojOdobravanja ?? 0),
                brojOdbijanja: Number(s?.brojOdbijanja ?? 0),
            };
        });
    }
};
exports.IteracijaProjektaService = IteracijaProjektaService;
exports.IteracijaProjektaService = IteracijaProjektaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(iteracija_projekta_entity_1.IteracijaProjekta)),
    __param(1, (0, typeorm_1.InjectRepository)(kompanija_iteracija_entity_1.KompanijaIteracija)),
    __param(2, (0, typeorm_1.InjectRepository)(kompanija_entity_1.Kompanija)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository])
], IteracijaProjektaService);
//# sourceMappingURL=iteracija-projekta.service.js.map