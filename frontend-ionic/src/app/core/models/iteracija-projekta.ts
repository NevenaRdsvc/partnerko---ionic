import { NazivProjekta } from '../enums/naziv-projekta.enum';

export interface IteracijaProjekta {
  id: number;
  naziv_projekta: NazivProjekta;
  godina: number;
}
