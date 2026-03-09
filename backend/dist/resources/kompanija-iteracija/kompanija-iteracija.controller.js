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
exports.KompanijaIteracijaController = void 0;
const common_1 = require("@nestjs/common");
const kompanija_iteracija_service_1 = require("./kompanija-iteracija.service");
const create_kompanija_iteracija_dto_1 = require("./dto/create-kompanija-iteracija.dto");
const update_kompanija_iteracija_dto_1 = require("./dto/update-kompanija-iteracija.dto");
let KompanijaIteracijaController = class KompanijaIteracijaController {
    constructor(kompanijaIteracijaService) {
        this.kompanijaIteracijaService = kompanijaIteracijaService;
    }
    create(kompanijaId, createKompanijaIteracijaDto) {
        return this.kompanijaIteracijaService.create(kompanijaId, createKompanijaIteracijaDto);
    }
    findAll() {
        return this.kompanijaIteracijaService.findAll();
    }
    findOne(id) {
        return this.kompanijaIteracijaService.findOne(+id);
    }
    update(kompanijaId, iteracijaId, updateKompanijaIteracijaDto) {
        return this.kompanijaIteracijaService.update(+kompanijaId, +iteracijaId, updateKompanijaIteracijaDto);
    }
    remove(id) {
        return this.kompanijaIteracijaService.remove(+id);
    }
};
exports.KompanijaIteracijaController = KompanijaIteracijaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('kompanijaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_kompanija_iteracija_dto_1.CreateKompanijaIteracijaDto]),
    __metadata("design:returntype", void 0)
], KompanijaIteracijaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KompanijaIteracijaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KompanijaIteracijaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':iteracijaId'),
    __param(0, (0, common_1.Param)('kompanijaId')),
    __param(1, (0, common_1.Param)('iteracijaId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_kompanija_iteracija_dto_1.UpdateKompanijaIteracijaDto]),
    __metadata("design:returntype", void 0)
], KompanijaIteracijaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KompanijaIteracijaController.prototype, "remove", null);
exports.KompanijaIteracijaController = KompanijaIteracijaController = __decorate([
    (0, common_1.Controller)('kompanija/:kompanijaId/iteracija'),
    __metadata("design:paramtypes", [kompanija_iteracija_service_1.KompanijaIteracijaService])
], KompanijaIteracijaController);
//# sourceMappingURL=kompanija-iteracija.controller.js.map