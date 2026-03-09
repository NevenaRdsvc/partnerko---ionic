"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IteracijaProjektaModule = void 0;
const common_1 = require("@nestjs/common");
const iteracija_projekta_service_1 = require("./iteracija-projekta.service");
const iteracija_projekta_controller_1 = require("./iteracija-projekta.controller");
const typeorm_1 = require("@nestjs/typeorm");
const iteracija_projekta_entity_1 = require("./entities/iteracija-projekta.entity");
const kompanija_iteracija_entity_1 = require("../kompanija-iteracija/entities/kompanija-iteracija.entity");
const kompanija_entity_1 = require("../kompanija/entities/kompanija.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
let IteracijaProjektaModule = class IteracijaProjektaModule {
};
exports.IteracijaProjektaModule = IteracijaProjektaModule;
exports.IteracijaProjektaModule = IteracijaProjektaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([iteracija_projekta_entity_1.IteracijaProjekta, kompanija_iteracija_entity_1.KompanijaIteracija, kompanija_entity_1.Kompanija, korisnik_entity_1.Korisnik])],
        controllers: [iteracija_projekta_controller_1.IteracijaProjektaController],
        providers: [iteracija_projekta_service_1.IteracijaProjektaService],
    })
], IteracijaProjektaModule);
//# sourceMappingURL=iteracija-projekta.module.js.map