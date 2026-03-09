import { PartialType } from '@nestjs/mapped-types';
import { CreateKorisnikIteracijaDto } from './create-korisnik-iteracija.dto';

export class UpdateKorisnikIteracijaDto extends PartialType(CreateKorisnikIteracijaDto) {}
