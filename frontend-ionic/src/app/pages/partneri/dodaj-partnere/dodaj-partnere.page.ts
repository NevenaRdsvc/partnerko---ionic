import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonSearchbar, IonSpinner, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { businessOutline, checkmarkOutline } from 'ionicons/icons';
import { KompanijaService } from '../../../core/services/kompanija.service';
import { TipPartnera } from '../../../core/enums/tip-partnera.enum';
import { KompanijaResponseModel } from '../../../core/models/kompanija';

@Component({
  selector: 'app-dodaj-partnere',
  templateUrl: 'dodaj-partnere.page.html',
  styleUrls: ['dodaj-partnere.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonSearchbar, IonSpinner, IonIcon,
  ],
})
export class DodajPartneriPage implements OnInit {
  projekatId!: number;
  tipPartnera!: TipPartnera;

  kompanije: KompanijaResponseModel[] = [];
  selektovane = new Set<number>();
  loading = false;
  saving = false;
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kompanijaService: KompanijaService,
  ) {
    addIcons({ businessOutline, checkmarkOutline });
  }

  ngOnInit(): void {
    this.projekatId = +this.route.snapshot.params['id'];
    this.tipPartnera = (this.route.snapshot.queryParams['tipPartnera'] as TipPartnera) || TipPartnera.ROBNI;

    this.loading = true;
    this.kompanijaService.getDostupne(this.projekatId, this.tipPartnera).subscribe({
      next: (res) => {
        this.kompanije = res.map((r: any) => ({
          ...r,
          ID: r.ID ?? r.id,
          napomena: r.napomena ?? '',
          stanje: 'Nije dodeljeno',
          zaduzen: '',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: false,
          brojCimanja: r.brojCimanja ?? 0,
          brojOdobravanja: r.brojOdobravanja ?? 0,
          brojOdbijanja: r.brojOdbijanja ?? 0,
          napomene: r.napomene ?? [],
        }));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  get backUrl(): string {
    const segment = this.tipPartnera === TipPartnera.FINANSIJSKI ? 'finansijski-partneri' : 'robni-partneri';
    return `/projekat/${this.projekatId}/${segment}`;
  }

  get filtriraneKompanije(): KompanijaResponseModel[] {
    if (!this.searchTerm.trim()) return this.kompanije;
    const term = this.searchTerm.toLowerCase();
    return this.kompanije.filter(k => k.naziv.toLowerCase().includes(term));
  }

  isSelected(id: number): boolean {
    return this.selektovane.has(id);
  }

  toggleSelektovan(id: number) {
    if (this.selektovane.has(id)) {
      this.selektovane.delete(id);
    } else {
      this.selektovane.add(id);
    }
  }

  potvrdi() {
    if (this.selektovane.size === 0) return;
    this.saving = true;
    const ids = Array.from(this.selektovane);
    this.kompanijaService.batchAddToIteracija(this.projekatId, ids, this.tipPartnera).subscribe({
      next: () => this.router.navigate([this.backUrl], { replaceUrl: true }),
      error: () => { this.saving = false; },
    });
  }
}
