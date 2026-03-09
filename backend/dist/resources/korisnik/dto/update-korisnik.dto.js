"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKorisnikDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_korisnik_dto_1 = require("./create-korisnik.dto");
class UpdateKorisnikDto extends (0, mapped_types_1.PartialType)(create_korisnik_dto_1.CreateKorisnikDto) {
}
exports.UpdateKorisnikDto = UpdateKorisnikDto;
//# sourceMappingURL=update-korisnik.dto.js.map