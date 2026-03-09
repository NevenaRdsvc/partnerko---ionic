import { TipKorisnika } from "src/enums/tip-korisnika";
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateKorisnikDto {

    @IsString()
    username:string;

    @IsString()
    lozinka:string;

    @IsString()
    ime:string;

    @IsString()
    prezime:string;

    @IsEnum(TipKorisnika)
    tip:TipKorisnika;

    @IsOptional()
    @IsNumber()
    iteracija_id?: number;
}
