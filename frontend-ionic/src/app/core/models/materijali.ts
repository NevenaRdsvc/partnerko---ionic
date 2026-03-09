export interface MaterijaliModel {
  id: number;
  url: string;
  javniId: string;
  originalnoIme: string;
  imeCloud: string;
  datumKreiranja: string;
  tags?: string[];
  kompanija?: { id: number; naziv: string };
}
