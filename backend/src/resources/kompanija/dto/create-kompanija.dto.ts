import { IsEnum, IsString } from "class-validator";
import { TipPartnera } from "src/enums/tip-partnera";

export class CreateKompanijaDto {
    @IsString()
    naziv: string;

    @IsString()
    websajt: string;

    @IsString()
    kontakt: string;

    @IsEnum(TipPartnera)
    tip: TipPartnera;
}
