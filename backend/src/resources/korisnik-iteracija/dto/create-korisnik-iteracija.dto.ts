import { IsNumber } from 'class-validator';

export class CreateKorisnikIteracijaDto {
  @IsNumber()
  korisnik_id: number;

  @IsNumber()
  iteracija_id: number;
}
