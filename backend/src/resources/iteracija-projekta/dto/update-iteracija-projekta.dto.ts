import { PartialType } from '@nestjs/mapped-types';
import { CreateIteracijaProjektaDto } from './create-iteracija-projekta.dto';

export class UpdateIteracijaProjektaDto extends PartialType(CreateIteracijaProjektaDto) {}
