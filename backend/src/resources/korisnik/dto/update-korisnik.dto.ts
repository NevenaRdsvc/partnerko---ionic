import { PartialType } from '@nestjs/mapped-types';
import { CreateKorisnikDto } from './create-korisnik.dto';

export class UpdateKorisnikDto extends PartialType(CreateKorisnikDto) {}
