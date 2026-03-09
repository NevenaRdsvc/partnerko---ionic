import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterijaliDto } from './create-materijali.dto';

export class UpdateMaterijaliDto extends PartialType(CreateMaterijaliDto) {}
