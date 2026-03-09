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
exports.KompanijaController = void 0;
const common_1 = require("@nestjs/common");
const kompanija_service_1 = require("./kompanija.service");
const create_kompanija_dto_1 = require("./dto/create-kompanija.dto");
const update_kompanija_dto_1 = require("./dto/update-kompanija.dto");
let KompanijaController = class KompanijaController {
    constructor(kompanijaService) {
        this.kompanijaService = kompanijaService;
    }
    async create(createKompanijaDto) {
        return await this.kompanijaService.create(createKompanijaDto);
    }
    findAll() {
        return this.kompanijaService.findAll();
    }
    findOne(id) {
        return this.kompanijaService.findOne(+id);
    }
    update(id, updateKompanijaDto) {
        return this.kompanijaService.update(+id, updateKompanijaDto);
    }
    remove(id) {
        return this.kompanijaService.remove(+id);
    }
};
exports.KompanijaController = KompanijaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kompanija_dto_1.CreateKompanijaDto]),
    __metadata("design:returntype", Promise)
], KompanijaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KompanijaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KompanijaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_kompanija_dto_1.UpdateKompanijaDto]),
    __metadata("design:returntype", void 0)
], KompanijaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KompanijaController.prototype, "remove", null);
exports.KompanijaController = KompanijaController = __decorate([
    (0, common_1.Controller)('kompanija'),
    __metadata("design:paramtypes", [kompanija_service_1.KompanijaService])
], KompanijaController);
//# sourceMappingURL=kompanija.controller.js.map