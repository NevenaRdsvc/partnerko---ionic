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
exports.IteracijaProjekta = void 0;
const naziv_projekta_1 = require("../../../enums/naziv-projekta");
const kompanija_iteracija_entity_1 = require("../../kompanija-iteracija/entities/kompanija-iteracija.entity");
const korisnik_iteracija_entity_1 = require("../../korisnik-iteracija/entities/korisnik-iteracija.entity");
const typeorm_1 = require("typeorm");
let IteracijaProjekta = class IteracijaProjekta {
};
exports.IteracijaProjekta = IteracijaProjekta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IteracijaProjekta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IteracijaProjekta.prototype, "naziv_projekta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], IteracijaProjekta.prototype, "godina", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => korisnik_iteracija_entity_1.KorisnikIteracija, ki => ki.iteracija),
    __metadata("design:type", Array)
], IteracijaProjekta.prototype, "korisnikIteracije", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => kompanija_iteracija_entity_1.KompanijaIteracija, ki => ki.iteracija),
    __metadata("design:type", Array)
], IteracijaProjekta.prototype, "kompanijaIteracije", void 0);
exports.IteracijaProjekta = IteracijaProjekta = __decorate([
    (0, typeorm_1.Entity)()
], IteracijaProjekta);
//# sourceMappingURL=iteracija-projekta.entity.js.map