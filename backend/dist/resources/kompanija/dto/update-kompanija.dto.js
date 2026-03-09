"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKompanijaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_kompanija_dto_1 = require("./create-kompanija.dto");
class UpdateKompanijaDto extends (0, mapped_types_1.PartialType)(create_kompanija_dto_1.CreateKompanijaDto) {
}
exports.UpdateKompanijaDto = UpdateKompanijaDto;
//# sourceMappingURL=update-kompanija.dto.js.map