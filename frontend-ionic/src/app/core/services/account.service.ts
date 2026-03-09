import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LS_REFRESH_TOKEN,
  LS_USER_ITERACIJA_ID,
  LS_USER_ROLES,
  LS_USER_TOKEN,
} from '../constants';
import { AuthResponseModel, UserLoginModel, UserMeModel } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/accounts`;
  private readonly httpDirect: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpDirect = new HttpClient(handler);
  }

  signIn(model: UserLoginModel): Observable<AuthResponseModel> {
    return this.http
      .post<AuthResponseModel>(`${this.API_ENDPOINT}/login`, model)
      .pipe(tap(res => this.handleAuthentication(res)));
  }

  signOut() {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    if (refreshToken) {
      this.http.post(`${this.API_ENDPOINT}/logout`, {}).subscribe({ error: () => {} });
    }
    localStorage.clear();
    location.href = '/';
  }

  refreshAccessToken(): Observable<{ token: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    return this.httpDirect
      .post<{ token: string; refreshToken: string }>(`${this.API_ENDPOINT}/refresh`, { refreshToken })
      .pipe(
        tap(res => {
          localStorage.setItem(LS_USER_TOKEN, res.token);
          localStorage.setItem(LS_REFRESH_TOKEN, res.refreshToken);
        }),
      );
  }

  authenticated(): boolean {
    const token = localStorage.getItem(LS_USER_TOKEN);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp * 1000 > Date.now()) return true;
    } catch {}
    return localStorage.getItem(LS_REFRESH_TOKEN) != null;
  }

  handleAuthentication(authResponse: AuthResponseModel) {
    localStorage.removeItem(LS_USER_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
    localStorage.removeItem(LS_USER_ROLES);
    localStorage.removeItem(LS_USER_ITERACIJA_ID);

    const parsedToken = this.parseJwt(authResponse.token);
    localStorage.setItem(LS_USER_TOKEN, authResponse.token);
    localStorage.setItem(LS_USER_ROLES, parsedToken.roles);

    if (authResponse.refreshToken) {
      localStorage.setItem(LS_REFRESH_TOKEN, authResponse.refreshToken);
    }
    if (parsedToken.iteracija_id != null) {
      localStorage.setItem(LS_USER_ITERACIJA_ID, String(parsedToken.iteracija_id));
    }
  }

  getIteracijaId(): number | null {
    const id = localStorage.getItem(LS_USER_ITERACIJA_ID);
    return id ? +id : null;
  }

  getLoggedUserRoles(): string | null {
    return localStorage.getItem(LS_USER_ROLES);
  }

  getUsername(): string | null {
    const token = localStorage.getItem(LS_USER_TOKEN);
    if (!token) return null;
    try {
      return this.parseJwt(token).username ?? null;
    } catch {
      return null;
    }
  }

  isInRole(roleName: string): boolean {
    if (!this.authenticated()) return false;
    const roles = this.getLoggedUserRoles();
    return !!roles && roles.includes(roleName);
  }

  getMyUserInfo(): Observable<UserMeModel> {
    return this.http.get<UserMeModel>(`${this.API_ENDPOINT}/me`);
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
}
