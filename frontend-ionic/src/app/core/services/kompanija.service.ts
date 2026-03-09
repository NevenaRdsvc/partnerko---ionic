import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipPartnera } from '../enums/tip-partnera.enum';
import { KompanijaBasicModel, KompanijaResponseModel } from '../models/kompanija';

@Injectable({ providedIn: 'root' })
export class KompanijaService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/iteracija-projekta`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<KompanijaBasicModel[]> {
    return this.http.get<KompanijaBasicModel[]>(`${environment.apiUrl}/kompanija`);
  }

  create(naziv: string, websajt: string, kontakt: string, tip: TipPartnera): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kompanija`, { naziv, websajt, kontakt, tip });
  }

  getDostupne(iteracijaId: number, tipPartnera: TipPartnera): Observable<KompanijaBasicModel[]> {
    return this.http.get<KompanijaBasicModel[]>(
      `${this.API_ENDPOINT}/${iteracijaId}/kompanije/dostupne`,
      { params: { tipPartnera } },
    );
  }

  batchAddToIteracija(iteracijaId: number, kompanijaIds: number[], tipPartnera: TipPartnera): Observable<any> {
    return this.http.post(
      `${this.API_ENDPOINT}/${iteracijaId}/kompanije/batch`,
      { kompanija_ids: kompanijaIds, tip_partnera: tipPartnera },
    );
  }

  getByIteracija(iteracijaId: number, tipPartnera: TipPartnera, status?: string): Observable<KompanijaResponseModel[]> {
    const params: any = { tipPartnera };
    if (status) params['status'] = status;
    return this.http.get<KompanijaResponseModel[]>(
      `${this.API_ENDPOINT}/${iteracijaId}/kompanije`,
      { params },
    );
  }

  updateKompanija(id: number, dto: { naziv?: string; websajt?: string; kontakt?: string }): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/kompanija/${id}`, dto);
  }

  updateKompanijaIteracija(kompanijaId: number, iteracijaId: number, dto: Record<string, any>): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/kompanija/${kompanijaId}/iteracija/${iteracijaId}`,
      dto,
    );
  }
}
