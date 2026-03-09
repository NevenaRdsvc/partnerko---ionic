"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompanijaIteracijaModule = void 0;
const common_1 = require("@nestjs/common");
const kompanija_iteracija_service_1 = require("./kompanija-iteracija.service");
const kompanija_iteracija_controller_1 = require("./kompanija-iteracija.controller");
const typeorm_1 = require("@nestjs/typeorm");
const kompanija_iteracija_entity_1 = require("./entities/kompanija-iteracija.entity");
const kompanija_entity_1 = require("../kompanija/entities/kompanija.entity");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
let KompanijaIteracijaModule = class KompanijaIteracijaModule {
};
exports.KompanijaIteracijaModule = KompanijaIteracijaModule;
exports.KompanijaIteracijaModule = KompanijaIteracijaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([kompanija_iteracija_entity_1.KompanijaIteracija, kompanija_entity_1.Kompanija, iteracija_projekta_entity_1.IteracijaProjekta, korisnik_entity_1.Korisnik])],
        controllers: [kompanija_iteracija_controller_1.KompanijaIteracijaController],
        providers: [kompanija_iteracija_service_1.KompanijaIteracijaService],
    })
], KompanijaIteracijaModule);
//# sourceMappingURL=kompanija-iteracija.module.js.map