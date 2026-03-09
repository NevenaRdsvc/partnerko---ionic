export interface KompanijaBasicModel {
  id: number;
  naziv: string;
  websajt: string;
  kontakt: string;
}

export interface KompanijaResponseModel {
  ID: number;
  naziv: string;
  napomena: string;
  napomene?: string[];
  websajt: string;
  kontakt: string;
  zaduzen: string;
  korisnikId: number | null;
  stanje: string;
  datumCimanja: Date;
  datumPodsetnik: Date;
  datumPoziva: Date;
  odobreno: boolean;
  iteracijaId?: number;
  brojCimanja: number;
  brojOdobravanja: number;
  brojOdbijanja: number;
}

export interface KorisnikModel {
  id: number;
  ime: string;
  prezime: string;
  username: string;
  tip: string;
}
