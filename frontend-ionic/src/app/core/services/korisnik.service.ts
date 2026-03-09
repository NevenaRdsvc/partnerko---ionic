import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KorisnikModel } from '../models/kompanija';

@Injectable({ providedIn: 'root' })
export class KorisnikService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/korisnik`;
  private readonly KI_ENDPOINT = `${environment.apiUrl}/korisnik-iteracija`;

  constructor(private http: HttpClient) {}

  getByProject(iteracijaId: number): Observable<KorisnikModel[]> {
    return this.http.get<KorisnikModel[]>(this.API_ENDPOINT, {
      params: { idProjekta: iteracijaId },
    });
  }

  getSvi(): Observable<KorisnikModel[]> {
    return this.http.get<KorisnikModel[]>(`${this.API_ENDPOINT}/svi`);
  }

  create(dto: {
    username: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: string;
    iteracija_id: number;
  }): Observable<KorisnikModel> {
    return this.http.post<KorisnikModel>(this.API_ENDPOINT, dto);
  }

  addToIteracija(korisnik_id: number, iteracija_id: number): Observable<any> {
    return this.http.post(this.KI_ENDPOINT, { korisnik_id, iteracija_id });
  }

  removeFromIteracija(korisnikId: number, iteracijaId: number): Observable<any> {
    return this.http.delete(`${this.KI_ENDPOINT}/${korisnikId}/${iteracijaId}`);
  }
}
