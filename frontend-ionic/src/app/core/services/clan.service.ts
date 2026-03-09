import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClanService {
  getStanja(): Observable<string[]> {
    return of(['Poslat email', 'Poslat podsetnik', 'Poziv', 'Odobreno', 'Odbijeno']);
  }
}
