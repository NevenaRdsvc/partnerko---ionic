import { IsArray, IsEnum, IsNumber } from 'class-validator';
import { TipPartnera } from 'src/enums/tip-partnera';

export class BatchKompanijaIteracijaDto {
  @IsArray()
  @IsNumber({}, { each: true })
  kompanija_ids: number[];

  @IsEnum(TipPartnera)
  tip_partnera: TipPartnera;
}
