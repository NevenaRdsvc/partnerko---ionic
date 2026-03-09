import { IsNumberString } from 'class-validator';

export class CreateMaterijaliDto {
  @IsNumberString()
  kompanija_id: string;
}
