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
exports.KompanijaIteracijaService = void 0;
const common_1 = require("@nestjs/common");
const kompanija_iteracija_entity_1 = require("./entities/kompanija-iteracija.entity");
const Repository_1 = require("typeorm/repository/Repository");
const typeorm_decorators_1 = require("@nestjs/typeorm/dist/common/typeorm.decorators");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
const kompanija_entity_1 = require("../kompanija/entities/kompanija.entity");
let KompanijaIteracijaService = class KompanijaIteracijaService {
    constructor(kompanijaIteracijaRepository, korisnikRepository, iteracijaRepository, kompanijaRepository) {
        this.kompanijaIteracijaRepository = kompanijaIteracijaRepository;
        this.korisnikRepository = korisnikRepository;
        this.iteracijaRepository = iteracijaRepository;
        this.kompanijaRepository = kompanijaRepository;
    }
    create(kompanijaId, createKompanijaIteracijaDto) {
        const kompanijaIteracija = this.kompanijaIteracijaRepository.create({
            iteracija: { id: createKompanijaIteracijaDto.iteracija_id },
            kompanija: { id: kompanijaId },
            tip_partnera: createKompanijaIteracijaDto.tip_partnera,
            korisnik: { id: createKompanijaIteracijaDto.korisnik_id }
        });
        return this.kompanijaIteracijaRepository.save(kompanijaIteracija);
    }
    findAll() {
        return `This action returns all kompanijaIteracija`;
    }
    findOne(id) {
        return `This action returns a #${id} kompanijaIteracija`;
    }
    async update(kompanijaId, iteracijaId, dto) {
        const record = await this.kompanijaIteracijaRepository.findOne({
            where: { kompanija_id: kompanijaId, iteracija_id: iteracijaId },
        });
        if (!record)
            throw new common_1.NotFoundException('Zapis nije pronađen.');
        const { korisnik_id, stanje, ...rest } = dto;
        Object.assign(record, rest);
        if (stanje !== undefined) {
            record.stanje = stanje;
            if (stanje === 'Odobreno')
                record.odobrena = true;
            else if (stanje === 'Odbijeno')
                record.odobrena = false;
            else
                record.odobrena = null;
            const today = new Date();
            if (stanje === 'Poslat email')
                record.datum_cimanja = today;
            if (stanje === 'Poslat podsetnik')
                record.datum_podsetnik = today;
            if (stanje === 'Poziv')
                record.datum_poziv = today;
        }
        if (korisnik_id !== undefined) {
            record.korisnik = { id: korisnik_id };
        }
        return await this.kompanijaIteracijaRepository.save(record);
    }
    remove(id) {
        return `This action removes a #${id} kompanijaIteracija`;
    }
};
exports.KompanijaIteracijaService = KompanijaIteracijaService;
exports.KompanijaIteracijaService = KompanijaIteracijaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_decorators_1.InjectRepository)(kompanija_iteracija_entity_1.KompanijaIteracija)),
    __param(1, (0, typeorm_decorators_1.InjectRepository)(korisnik_entity_1.Korisnik)),
    __param(2, (0, typeorm_decorators_1.InjectRepository)(iteracija_projekta_entity_1.IteracijaProjekta)),
    __param(3, (0, typeorm_decorators_1.InjectRepository)(kompanija_entity_1.Kompanija)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository])
], KompanijaIteracijaService);
//# sourceMappingURL=kompanija-iteracija.service.js.map