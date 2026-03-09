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
exports.Kompanija = void 0;
const tip_partnera_1 = require("../../../enums/tip-partnera");
const kompanija_iteracija_entity_1 = require("../../kompanija-iteracija/entities/kompanija-iteracija.entity");
const typeorm_1 = require("typeorm");
let Kompanija = class Kompanija {
};
exports.Kompanija = Kompanija;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Kompanija.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kompanija.prototype, "naziv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kompanija.prototype, "websajt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kompanija.prototype, "kontakt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Kompanija.prototype, "tip", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => kompanija_iteracija_entity_1.KompanijaIteracija, ki => ki.kompanija),
    __metadata("design:type", Array)
], Kompanija.prototype, "kompanijaIteracije", void 0);
exports.Kompanija = Kompanija = __decorate([
    (0, typeorm_1.Entity)()
], Kompanija);
//# sourceMappingURL=kompanija.entity.js.map