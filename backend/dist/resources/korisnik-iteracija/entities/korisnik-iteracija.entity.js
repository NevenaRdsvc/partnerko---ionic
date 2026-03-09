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
exports.KorisnikIteracija = void 0;
const iteracija_projekta_entity_1 = require("../../iteracija-projekta/entities/iteracija-projekta.entity");
const korisnik_entity_1 = require("../../korisnik/entities/korisnik.entity");
const typeorm_1 = require("typeorm");
let KorisnikIteracija = class KorisnikIteracija {
};
exports.KorisnikIteracija = KorisnikIteracija;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], KorisnikIteracija.prototype, "korisnik_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => korisnik_entity_1.Korisnik, korisnik => korisnik.korisnikIteracije, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'korisnik_id' }),
    __metadata("design:type", korisnik_entity_1.Korisnik)
], KorisnikIteracija.prototype, "korisnik", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], KorisnikIteracija.prototype, "iteracija_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => iteracija_projekta_entity_1.IteracijaProjekta, iteracija => iteracija.korisnikIteracije),
    (0, typeorm_1.JoinColumn)({ name: 'iteracija_id' }),
    __metadata("design:type", iteracija_projekta_entity_1.IteracijaProjekta)
], KorisnikIteracija.prototype, "iteracija", void 0);
exports.KorisnikIteracija = KorisnikIteracija = __decorate([
    (0, typeorm_1.Entity)()
], KorisnikIteracija);
//# sourceMappingURL=korisnik-iteracija.entity.js.map