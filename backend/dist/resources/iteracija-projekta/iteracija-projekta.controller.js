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
exports.IteracijaProjektaController = void 0;
const common_1 = require("@nestjs/common");
const iteracija_projekta_service_1 = require("./iteracija-projekta.service");
const create_iteracija_projekta_dto_1 = require("./dto/create-iteracija-projekta.dto");
const update_iteracija_projekta_dto_1 = require("./dto/update-iteracija-projekta.dto");
const batch_kompanija_iteracija_dto_1 = require("./dto/batch-kompanija-iteracija.dto");
const naziv_projekta_1 = require("../../enums/naziv-projekta");
const tip_partnera_1 = require("../../enums/tip-partnera");
let IteracijaProjektaController = class IteracijaProjektaController {
    constructor(iteracijaProjektaService) {
        this.iteracijaProjektaService = iteracijaProjektaService;
    }
    create(createIteracijaProjektaDto) {
        return this.iteracijaProjektaService.create(createIteracijaProjektaDto);
    }
    findAll(naziv) {
        return this.iteracijaProjektaService.findLast(naziv);
    }
    batchAddKompanije(id, dto) {
        return this.iteracijaProjektaService.batchAddKompanije(+id, dto);
    }
    findDostupne(id, tipPartnera) {
        return this.iteracijaProjektaService.findDostupne(+id, tipPartnera);
    }
    findKompanije(id, tipPartnera, status) {
        return this.iteracijaProjektaService.findKompanije(+id, tipPartnera, status);
    }
    findAllByNaziv(naziv) {
        return this.iteracijaProjektaService.findAllByNaziv(naziv);
    }
    findOne(id) {
        return this.iteracijaProjektaService.findOne(+id);
    }
    update(id, updateIteracijaProjektaDto) {
        return this.iteracijaProjektaService.update(+id, updateIteracijaProjektaDto);
    }
    remove(id) {
        return this.iteracijaProjektaService.remove(+id);
    }
};
exports.IteracijaProjektaController = IteracijaProjektaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_iteracija_projekta_dto_1.CreateIteracijaProjektaDto]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('poslednji'),
    __param(0, (0, common_1.Query)('naziv')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/kompanije/batch'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, batch_kompanija_iteracija_dto_1.BatchKompanijaIteracijaDto]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "batchAddKompanije", null);
__decorate([
    (0, common_1.Get)(':id/kompanije/dostupne'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('tipPartnera')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findDostupne", null);
__decorate([
    (0, common_1.Get)(':id/kompanije'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('tipPartnera')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findKompanije", null);
__decorate([
    (0, common_1.Get)('sve'),
    __param(0, (0, common_1.Query)('naziv')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findAllByNaziv", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_iteracija_projekta_dto_1.UpdateIteracijaProjektaDto]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "remove", null);
exports.IteracijaProjektaController = IteracijaProjektaController = __decorate([
    (0, common_1.Controller)('iteracija-projekta'),
    __metadata("design:paramtypes", [iteracija_projekta_service_1.IteracijaProjektaService])
], IteracijaProjektaController);
//# sourceMappingURL=iteracija-projekta.controller.js.map