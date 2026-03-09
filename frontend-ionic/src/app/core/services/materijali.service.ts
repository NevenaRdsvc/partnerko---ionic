import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaterijaliModel } from '../models/materijali';

@Injectable({ providedIn: 'root' })
export class MaterijaliService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/materijali`;

  constructor(private http: HttpClient) {}

  upload(file: File, kompanija_id: number): Observable<MaterijaliModel> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('kompanija_id', String(kompanija_id));
    return this.http.post<MaterijaliModel>(this.API_ENDPOINT, formData);
  }

  getAll(search?: string): Observable<MaterijaliModel[]> {
    const params: any = {};
    if (search) params['search'] = search;
    return this.http.get<MaterijaliModel[]>(this.API_ENDPOINT, { params });
  }

  getKompanije(): Observable<{ id: number; naziv: string }[]> {
    return this.http.get<{ id: number; naziv: string }[]>(`${this.API_ENDPOINT}/kompanije`);
  }

  syncTags(): Observable<{ message: string; updated: number }> {
    return this.http.post<{ message: string; updated: number }>(`${this.API_ENDPOINT}/sync-tags`, {});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_ENDPOINT}/${id}`);
  }
}
