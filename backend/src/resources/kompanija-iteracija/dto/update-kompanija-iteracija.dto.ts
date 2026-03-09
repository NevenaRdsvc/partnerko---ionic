import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateKompanijaIteracijaDto {
  @IsOptional()
  @IsNumber()
  korisnik_id?: number;

  @IsOptional()
  odobrena?: boolean | null;

  @IsOptional()
  @IsString()
  stanje?: string;

  @IsOptional()
  @IsString()
  napomena?: string;
}
