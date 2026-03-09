import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons,
  IonBackButton, IonSpinner,
} from '@ionic/angular/standalone';
import { KompanijaService } from '../../../core/services/kompanija.service';
import { TipPartnera } from '../../../core/enums/tip-partnera.enum';

@Component({
  selector: 'app-kreiraj-partner',
  templateUrl: 'kreiraj-partner.page.html',
  styleUrls: ['kreiraj-partner.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons,
    IonBackButton, IonSpinner,
  ],
})
export class KreirajPartnerPage implements OnInit {
  projekatId!: number;
  tipPartnera!: TipPartnera;

  naziv = '';
  websajt = '';
  kontakt = '';
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kompanijaService: KompanijaService,
  ) {}

  ngOnInit(): void {
    this.projekatId = +this.route.snapshot.params['id'];
    this.tipPartnera = (this.route.snapshot.queryParams['tipPartnera'] as TipPartnera) || TipPartnera.ROBNI;
  }

  get backUrl(): string {
    const segment = this.tipPartnera === TipPartnera.FINANSIJSKI ? 'finansijski-partneri' : 'robni-partneri';
    return `/projekat/${this.projekatId}/${segment}`;
  }

  get tipLabel(): string {
    return this.tipPartnera === TipPartnera.FINANSIJSKI ? 'Finansijski' : 'Robni';
  }

  potvrdi() {
    if (!this.naziv.trim()) return;
    this.saving = true;
    this.error = '';

    this.kompanijaService
      .create(this.naziv, this.websajt, this.kontakt, this.tipPartnera)
      .pipe(
        switchMap((kompanija: any) =>
          this.kompanijaService.batchAddToIteracija(
            this.projekatId,
            [kompanija.id],
            this.tipPartnera,
          ),
        ),
      )
      .subscribe({
        next: () => this.router.navigate([this.backUrl], { replaceUrl: true }),
        error: () => {
          this.error = 'Greška pri kreiranju. Pokušajte ponovo.';
          this.saving = false;
        },
      });
  }
}
