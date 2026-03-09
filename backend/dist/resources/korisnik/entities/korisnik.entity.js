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
exports.Korisnik = void 0;
const tip_korisnika_1 = require("../../../enums/tip-korisnika");
const kompanija_iteracija_entity_1 = require("../../kompanija-iteracija/entities/kompanija-iteracija.entity");
const korisnik_iteracija_entity_1 = require("../../korisnik-iteracija/entities/korisnik-iteracija.entity");
const typeorm_1 = require("typeorm");
let Korisnik = class Korisnik {
};
exports.Korisnik = Korisnik;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Korisnik.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Korisnik.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Korisnik.prototype, "lozinka", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Korisnik.prototype, "ime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Korisnik.prototype, "prezime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Korisnik.prototype, "tip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", Object)
], Korisnik.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => kompanija_iteracija_entity_1.KompanijaIteracija, ki => ki.korisnik),
    __metadata("design:type", Array)
], Korisnik.prototype, "ki", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => korisnik_iteracija_entity_1.KorisnikIteracija, ki => ki.korisnik),
    __metadata("design:type", Array)
], Korisnik.prototype, "korisnikIteracije", void 0);
exports.Korisnik = Korisnik = __decorate([
    (0, typeorm_1.Entity)()
], Korisnik);
//# sourceMappingURL=korisnik.entity.js.map