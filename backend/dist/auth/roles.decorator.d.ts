import { TipKorisnika } from 'src/enums/tip-korisnika';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: TipKorisnika[]) => import("@nestjs/common").CustomDecorator<string>;
