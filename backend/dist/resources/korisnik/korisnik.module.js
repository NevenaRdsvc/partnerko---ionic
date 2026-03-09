"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikModule = void 0;
const common_1 = require("@nestjs/common");
const korisnik_service_1 = require("./korisnik.service");
const korisnik_controller_1 = require("./korisnik.controller");
const typeorm_1 = require("@nestjs/typeorm");
const korisnik_iteracija_entity_1 = require("../korisnik-iteracija/entities/korisnik-iteracija.entity");
const korisnik_entity_1 = require("./entities/korisnik.entity");
const iteracija_projekta_entity_1 = require("../iteracija-projekta/entities/iteracija-projekta.entity");
let KorisnikModule = class KorisnikModule {
};
exports.KorisnikModule = KorisnikModule;
exports.KorisnikModule = KorisnikModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([korisnik_iteracija_entity_1.KorisnikIteracija, korisnik_entity_1.Korisnik, iteracija_projekta_entity_1.IteracijaProjekta])],
        controllers: [korisnik_controller_1.KorisnikController],
        providers: [korisnik_service_1.KorisnikService],
    })
], KorisnikModule);
//# sourceMappingURL=korisnik.module.js.map