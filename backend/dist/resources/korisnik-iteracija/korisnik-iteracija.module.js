"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikIteracijaModule = void 0;
const common_1 = require("@nestjs/common");
const korisnik_iteracija_service_1 = require("./korisnik-iteracija.service");
const korisnik_iteracija_controller_1 = require("./korisnik-iteracija.controller");
const typeorm_1 = require("@nestjs/typeorm");
const korisnik_iteracija_entity_1 = require("./entities/korisnik-iteracija.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
let KorisnikIteracijaModule = class KorisnikIteracijaModule {
};
exports.KorisnikIteracijaModule = KorisnikIteracijaModule;
exports.KorisnikIteracijaModule = KorisnikIteracijaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([korisnik_iteracija_entity_1.KorisnikIteracija, korisnik_entity_1.Korisnik, iteracija_projekta_entity_1.IteracijaProjekta])],
        controllers: [korisnik_iteracija_controller_1.KorisnikIteracijaController],
        providers: [korisnik_iteracija_service_1.KorisnikIteracijaService],
    })
], KorisnikIteracijaModule);
//# sourceMappingURL=korisnik-iteracija.module.js.map