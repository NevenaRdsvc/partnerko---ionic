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
exports.KorisnikIteracijaController = void 0;
const common_1 = require("@nestjs/common");
const korisnik_iteracija_service_1 = require("./korisnik-iteracija.service");
const create_korisnik_iteracija_dto_1 = require("./dto/create-korisnik-iteracija.dto");
let KorisnikIteracijaController = class KorisnikIteracijaController {
    constructor(korisnikIteracijaService) {
        this.korisnikIteracijaService = korisnikIteracijaService;
    }
    create(dto) {
        return this.korisnikIteracijaService.create(dto);
    }
    remove(korisnikId, iteracijaId) {
        return this.korisnikIteracijaService.remove(+korisnikId, +iteracijaId);
    }
};
exports.KorisnikIteracijaController = KorisnikIteracijaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_korisnik_iteracija_dto_1.CreateKorisnikIteracijaDto]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':korisnikId/:iteracijaId'),
    __param(0, (0, common_1.Param)('korisnikId')),
    __param(1, (0, common_1.Param)('iteracijaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "remove", null);
exports.KorisnikIteracijaController = KorisnikIteracijaController = __decorate([
    (0, common_1.Controller)('korisnik-iteracija'),
    __metadata("design:paramtypes", [korisnik_iteracija_service_1.KorisnikIteracijaService])
], KorisnikIteracijaController);
//# sourceMappingURL=korisnik-iteracija.controller.js.map