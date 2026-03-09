import { PartialType } from '@nestjs/mapped-types';
import { CreateKompanijaDto } from './create-kompanija.dto';

export class UpdateKompanijaDto extends PartialType(CreateKompanijaDto) {}
