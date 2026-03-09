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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materijali = void 0;
const kompanija_entity_1 = require("../../kompanija/entities/kompanija.entity");
const typeorm_1 = require("typeorm");
let Materijali = class Materijali {
};
exports.Materijali = Materijali;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Materijali.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materijali.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materijali.prototype, "javniId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materijali.prototype, "originalnoIme", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materijali.prototype, "imeCloud", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Materijali.prototype, "datumKreiranja", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Materijali.prototype, "kompanija_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Materijali.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kompanija_entity_1.Kompanija, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'kompanija_id' }),
    __metadata("design:type", kompanija_entity_1.Kompanija)
], Materijali.prototype, "kompanija", void 0);
exports.Materijali = Materijali = __decorate([
    (0, typeorm_1.Entity)()
], Materijali);
//# sourceMappingURL=materijali.entity.js.map