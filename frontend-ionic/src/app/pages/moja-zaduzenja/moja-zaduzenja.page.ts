import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonIcon, IonSpinner, IonSegment, IonSegmentButton, IonLabel,
  IonRefresher, IonRefresherContent,
  IonItemSliding, IonItemOptions, IonItemOption,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, personOutline } from 'ionicons/icons';
import { AccountService } from '../../core/services/account.service';
import { KompanijaService } from '../../core/services/kompanija.service';
import { TipPartnera } from '../../core/enums/tip-partnera.enum';
import { KompanijaResponseModel } from '../../core/models/kompanija';
import { PartnerDetaljiModal } from '../partneri/partner-detalji/partner-detalji.modal';

@Component({
  selector: 'app-moja-zaduzenja',
  templateUrl: 'moja-zaduzenja.page.html',
  styleUrls: ['moja-zaduzenja.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonIcon, IonSpinner, IonSegment, IonSegmentButton, IonLabel,
    IonRefresher, IonRefresherContent,
    IonItemSliding, IonItemOptions, IonItemOption,
  ],
})
export class MojaZaduzenjaPage implements OnInit {
  robni: KompanijaResponseModel[] = [];
  finansijski: KompanijaResponseModel[] = [];
  activeTab: 'robni' | 'finansijski' = 'robni';
  isLoading = false;
  private iteracijaId: number | null = null;
  private myUserId: number | null = null;

  constructor(
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private modalCtrl: ModalController,
  ) {
    addIcons({ chevronForwardOutline, personOutline });
  }

  ngOnInit(): void {
    this.iteracijaId = this.accountService.getIteracijaId();
    if (!this.iteracijaId) return;

    this.isLoading = true;
    this.accountService.getMyUserInfo().subscribe({
      next: (me) => {
        this.myUserId = +me.id;
        this.loadZaduzenja();
      },
      error: () => { this.isLoading = false; },
    });
  }

  private loadZaduzenja(): void {
    if (!this.iteracijaId || !this.myUserId) return;

    forkJoin({
      robni: this.kompanijaService.getByIteracija(this.iteracijaId, TipPartnera.ROBNI),
      finansijski: this.kompanijaService.getByIteracija(this.iteracijaId, TipPartnera.FINANSIJSKI),
    }).subscribe({
      next: (res) => {
        this.robni = res.robni.filter(k => k.korisnikId === this.myUserId);
        this.finansijski = res.finansijski.filter(k => k.korisnikId === this.myUserId);
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  handleRefresh(event: any): void {
    if (!this.iteracijaId || !this.myUserId) { event.target.complete(); return; }
    forkJoin({
      robni: this.kompanijaService.getByIteracija(this.iteracijaId, TipPartnera.ROBNI),
      finansijski: this.kompanijaService.getByIteracija(this.iteracijaId, TipPartnera.FINANSIJSKI),
    }).subscribe({
      next: (res) => {
        this.robni = res.robni.filter(k => k.korisnikId === this.myUserId);
        this.finansijski = res.finansijski.filter(k => k.korisnikId === this.myUserId);
        event.target.complete();
      },
      error: () => { event.target.complete(); },
    });
  }

  async openDetaljiModal(kompanija: KompanijaResponseModel) {
    const modal = await this.modalCtrl.create({
      component: PartnerDetaljiModal,
      componentProps: {
        data: { ...kompanija, iteracijaId: this.iteracijaId },
        canEdit: true,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) this.loadZaduzenja();
  }

  getStanjeClass(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno': return 's-odobreno';
      case 'Odbijeno': return 's-odbijeno';
      case 'Poziv': return 's-poziv';
      case 'Poslat email': return 's-email';
      case 'Poslat podsetnik': return 's-podsetnik';
      default: return 's-default';
    }
  }

  getInitials(naziv: string): string {
    return naziv.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}
