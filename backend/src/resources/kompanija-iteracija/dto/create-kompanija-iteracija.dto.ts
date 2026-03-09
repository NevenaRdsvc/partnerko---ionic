import { IsOptional, IsEnum, IsNumber } from "class-validator";
import { TipPartnera } from "src/enums/tip-partnera";

export class CreateKompanijaIteracijaDto {
    @IsNumber()
    iteracija_id: number;
            
    @IsEnum(TipPartnera)
    tip_partnera: TipPartnera;
            
    @IsOptional()
    @IsNumber()
    korisnik_id:number;
}
