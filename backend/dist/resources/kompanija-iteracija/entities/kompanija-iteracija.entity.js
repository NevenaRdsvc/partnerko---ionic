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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompanijaIteracija = void 0;
const tip_partnera_1 = require("../../../enums/tip-partnera");
const iteracija_projekta_entity_1 = require("../../iteracija-projekta/entities/iteracija-projekta.entity");
const kompanija_entity_1 = require("../../kompanija/entities/kompanija.entity");
const korisnik_entity_1 = require("../../korisnik/entities/korisnik.entity");
const typeorm_1 = require("typeorm");
let KompanijaIteracija = class KompanijaIteracija {
};
exports.KompanijaIteracija = KompanijaIteracija;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], KompanijaIteracija.prototype, "kompanija_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kompanija_entity_1.Kompanija, kompanija => kompanija.kompanijaIteracije),
    (0, typeorm_1.JoinColumn)({ name: 'kompanija_id' }),
    __metadata("design:type", kompanija_entity_1.Kompanija)
], KompanijaIteracija.prototype, "kompanija", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], KompanijaIteracija.prototype, "iteracija_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => iteracija_projekta_entity_1.IteracijaProjekta, iteracija => iteracija.kompanijaIteracije),
    (0, typeorm_1.JoinColumn)({ name: 'iteracija_id' }),
    __metadata("design:type", iteracija_projekta_entity_1.IteracijaProjekta)
], KompanijaIteracija.prototype, "iteracija", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KompanijaIteracija.prototype, "tip_partnera", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], KompanijaIteracija.prototype, "datum_cimanja", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], KompanijaIteracija.prototype, "datum_podsetnik", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], KompanijaIteracija.prototype, "datum_poziv", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'boolean' }),
    __metadata("design:type", Object)
], KompanijaIteracija.prototype, "odobrena", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], KompanijaIteracija.prototype, "stanje", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], KompanijaIteracija.prototype, "napomena", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => korisnik_entity_1.Korisnik, korisnik => korisnik.ki),
    (0, typeorm_1.JoinColumn)({ name: 'korisnik_id' }),
    __metadata("design:type", korisnik_entity_1.Korisnik)
], KompanijaIteracija.prototype, "korisnik", void 0);
exports.KompanijaIteracija = KompanijaIteracija = __decorate([
    (0, typeorm_1.Entity)()
], KompanijaIteracija);
//# sourceMappingURL=kompanija-iteracija.entity.js.map