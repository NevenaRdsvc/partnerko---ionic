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
exports.MaterijaliController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const roles_decorator_1 = require("../../auth/roles.decorator");
const tip_korisnika_1 = require("../../enums/tip-korisnika");
const materijali_service_1 = require("./materijali.service");
const create_materijali_dto_1 = require("./dto/create-materijali.dto");
let MaterijaliController = class MaterijaliController {
    constructor(materijaliService) {
        this.materijaliService = materijaliService;
    }
    async upload(file, body) {
        if (!file)
            throw new common_1.BadRequestException('Fajl je obavezan.');
        return this.materijaliService.uploadMaterijal(file, body.kompanija_id);
    }
    findAll(search) {
        return this.materijaliService.findAll(search);
    }
    findKompanije() {
        return this.materijaliService.findKompanije();
    }
    syncTags() {
        return this.materijaliService.syncTags();
    }
    remove(id) {
        return this.materijaliService.remove(+id);
    }
};
exports.MaterijaliController = MaterijaliController;
__decorate([
    (0, roles_decorator_1.Roles)(tip_korisnika_1.TipKorisnika.ADMIN, tip_korisnika_1.TipKorisnika.KOORDINATOR),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_materijali_dto_1.CreateMaterijaliDto]),
    __metadata("design:returntype", Promise)
], MaterijaliController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterijaliController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('kompanije'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterijaliController.prototype, "findKompanije", null);
__decorate([
    (0, roles_decorator_1.Roles)(tip_korisnika_1.TipKorisnika.ADMIN),
    (0, common_1.Post)('sync-tags'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterijaliController.prototype, "syncTags", null);
__decorate([
    (0, roles_decorator_1.Roles)(tip_korisnika_1.TipKorisnika.ADMIN, tip_korisnika_1.TipKorisnika.KOORDINATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterijaliController.prototype, "remove", null);
exports.MaterijaliController = MaterijaliController = __decorate([
    (0, common_1.Controller)('materijali'),
    __metadata("design:paramtypes", [materijali_service_1.MaterijaliService])
], MaterijaliController);
//# sourceMappingURL=materijali.controller.js.map