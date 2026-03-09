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
exports.KorisnikController = void 0;
const common_1 = require("@nestjs/common");
const korisnik_service_1 = require("./korisnik.service");
const create_korisnik_dto_1 = require("./dto/create-korisnik.dto");
const update_korisnik_dto_1 = require("./dto/update-korisnik.dto");
let KorisnikController = class KorisnikController {
    constructor(korisnikService) {
        this.korisnikService = korisnikService;
    }
    async create(createKorisnikDto) {
        return await this.korisnikService.create(createKorisnikDto);
    }
    async findAll(idProjekta) {
        return await this.korisnikService.findAllByProject(+idProjekta);
    }
    async findAllNonKompanija() {
        return await this.korisnikService.findAllNonKompanija();
    }
    update(id, updateKorisnikDto) {
        return this.korisnikService.update(+id, updateKorisnikDto);
    }
    async remove(id) {
        return await this.korisnikService.remove(+id);
    }
};
exports.KorisnikController = KorisnikController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_korisnik_dto_1.CreateKorisnikDto]),
    __metadata("design:returntype", Promise)
], KorisnikController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('idProjekta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KorisnikController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('svi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KorisnikController.prototype, "findAllNonKompanija", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_korisnik_dto_1.UpdateKorisnikDto]),
    __metadata("design:returntype", void 0)
], KorisnikController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KorisnikController.prototype, "remove", null);
exports.KorisnikController = KorisnikController = __decorate([
    (0, common_1.Controller)('korisnik'),
    __metadata("design:paramtypes", [korisnik_service_1.KorisnikService])
], KorisnikController);
//# sourceMappingURL=korisnik.controller.js.map