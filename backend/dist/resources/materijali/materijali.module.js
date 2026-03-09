"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterijaliModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const materijali_service_1 = require("./materijali.service");
const materijali_controller_1 = require("./materijali.controller");
const materijali_entity_1 = require("./entities/materijali.entity");
const cloudinary_module_1 = require("../../cloudinary/cloudinary.module");
const kompanija_entity_1 = require("../kompanija/entities/kompanija.entity");
let MaterijaliModule = class MaterijaliModule {
};
exports.MaterijaliModule = MaterijaliModule;
exports.MaterijaliModule = MaterijaliModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([materijali_entity_1.Materijali, kompanija_entity_1.Kompanija]),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [materijali_controller_1.MaterijaliController],
        providers: [materijali_service_1.MaterijaliService],
    })
], MaterijaliModule);
//# sourceMappingURL=materijali.module.js.map