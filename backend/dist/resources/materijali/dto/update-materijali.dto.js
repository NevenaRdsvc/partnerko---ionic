"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterijaliDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_materijali_dto_1 = require("./create-materijali.dto");
class UpdateMaterijaliDto extends (0, mapped_types_1.PartialType)(create_materijali_dto_1.CreateMaterijaliDto) {
}
exports.UpdateMaterijaliDto = UpdateMaterijaliDto;
//# sourceMappingURL=update-materijali.dto.js.map