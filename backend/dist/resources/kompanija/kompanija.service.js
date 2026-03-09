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
exports.KompanijaService = void 0;
const common_1 = require("@nestjs/common");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
const Repository_1 = require("typeorm/repository/Repository");
const typeorm_decorators_1 = require("@nestjs/typeorm/dist/common/typeorm.decorators");
const kompanija_iteracija_entity_1 = require("../kompanija-iteracija/entities/kompanija-iteracija.entity");
const kompanija_entity_1 = require("./entities/kompanija.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
let KompanijaService = class KompanijaService {
    constructor(kompanijaRepository, kompanijaIteracijaRepository, iteracijaRepository, korisnikRepository) {
        this.kompanijaRepository = kompanijaRepository;
        this.kompanijaIteracijaRepository = kompanijaIteracijaRepository;
        this.iteracijaRepository = iteracijaRepository;
        this.korisnikRepository = korisnikRepository;
    }
    async create(createKompanijaDto) {
        const kompanija = this.kompanijaRepository.create(createKompanijaDto);
        return await this.kompanijaRepository.save(kompanija);
    }
    async findAll() {
        return await this.kompanijaRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} kompanija`;
    }
    async update(id, updateKompanijaDto) {
        const kompanija = await this.kompanijaRepository.findOneBy({ id });
        if (!kompanija) {
            throw new common_1.NotFoundException('Kompanija ne postoji');
        }
        Object.assign(kompanija, updateKompanijaDto);
        return this.kompanijaRepository.save(kompanija);
    }
    remove(id) {
        return `This action removes a #${id} kompanija`;
    }
};
exports.KompanijaService = KompanijaService;
exports.KompanijaService = KompanijaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_decorators_1.InjectRepository)(kompanija_entity_1.Kompanija)),
    __param(1, (0, typeorm_decorators_1.InjectRepository)(kompanija_iteracija_entity_1.KompanijaIteracija)),
    __param(2, (0, typeorm_decorators_1.InjectRepository)(iteracija_projekta_entity_1.IteracijaProjekta)),
    __param(3, (0, typeorm_decorators_1.InjectRepository)(korisnik_entity_1.Korisnik)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository])
], KompanijaService);
//# sourceMappingURL=kompanija.service.js.map