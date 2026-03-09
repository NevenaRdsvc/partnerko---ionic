import { SetMetadata } from '@nestjs/common';
import { TipKorisnika } from 'src/enums/tip-korisnika';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipKorisnika[]) => SetMetadata(ROLES_KEY, roles);
