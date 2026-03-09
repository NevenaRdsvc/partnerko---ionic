import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonIcon, IonSpinner, IonFab, IonFabButton, IonFabList,
  IonRefresher, IonRefresherContent, IonSkeletonText,
  IonItemSliding, IonItemOptions, IonItemOption,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, businessOutline, filterOutline, chevronForwardOutline,
  createOutline, checkmarkCircleOutline, closeCircleOutline, personOutline,
} from 'ionicons/icons';
import { TipPartnera } from '../../core/enums/tip-partnera.enum';
import { IteracijaProjekta } from '../../core/models/iteracija-projekta';
import { KompanijaResponseModel } from '../../core/models/kompanija';
import { AccountService } from '../../core/services/account.service';
import { IteracijaProjektaService } from '../../core/services/iteracija-projekta.service';
import { KompanijaService } from '../../core/services/kompanija.service';
import { PartnerDetaljiModal } from './partner-detalji/partner-detalji.modal';

@Component({
  selector: 'app-partneri',
  templateUrl: 'partneri.page.html',
  styleUrls: ['partneri.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonIcon, IonSpinner, IonFab, IonFabButton, IonFabList,
    IonRefresher, IonRefresherContent, IonSkeletonText,
    IonItemSliding, IonItemOptions, IonItemOption,
  ],
})
export class PartneriPage implements OnInit {
  partneri: KompanijaResponseModel[] = [];
  iteracije: IteracijaProjekta[] = [];
  projekatId: number = 0;
  tipPartnera: TipPartnera = TipPartnera.ROBNI;
  status = '';
  isAdmin = false;
  isKoordinator = false;
  isClan = false;
  isLoading = false;
  skeletonItems = [1, 2, 3, 4, 5];
  TipPartnera = TipPartnera;

  readonly statusOptions = ['', 'Poslat email', 'Poslat podsetnik', 'Poziv', 'Odobreno', 'Odbijeno'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private iteracijaService: IteracijaProjektaService,
    private modalCtrl: ModalController,
  ) {
    addIcons({ addOutline, businessOutline, filterOutline, chevronForwardOutline, createOutline, checkmarkCircleOutline, closeCircleOutline, personOutline });
  }

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');
    this.isClan = this.accountService.isInRole('clan');

    // Initialize synchronously from snapshot so ion-segment renders with the correct tab immediately
    this.projekatId = +this.route.snapshot.params['id'];
    this.tipPartnera = (this.route.snapshot.queryParams['tipPartnera'] as TipPartnera) || TipPartnera.ROBNI;
    this.status = this.route.snapshot.queryParams['status'] || '';

    combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, qParams]) => {
      this.projekatId = +params['id'];
      this.tipPartnera = (qParams['tipPartnera'] as TipPartnera) || TipPartnera.ROBNI;
      this.status = qParams['status'] || '';
      this.loadPartneri();
      this.loadIteracije();
    });
  }

  get pageTitle(): string {
    return this.tipPartnera === TipPartnera.FINANSIJSKI ? 'Finansijski partneri' : 'Robni partneri';
  }

  private loadPartneri(): void {
    this.isLoading = true;
    this.kompanijaService.getByIteracija(this.projekatId, this.tipPartnera, this.status || undefined).subscribe({
      next: (data) => { this.partneri = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  private loadIteracije(): void {
    this.iteracijaService.findById(this.projekatId).subscribe({
      next: (iteracija) => {
        this.iteracijaService.findAllByNaziv(iteracija.naziv_projekta).subscribe({
          next: (sve) => (this.iteracije = sve),
        });
      },
    });
  }

  switchTip(tip: TipPartnera): void {
    const segment = tip === TipPartnera.FINANSIJSKI ? 'finansijski-partneri' : 'robni-partneri';
    this.router.navigate(['/projekat', this.projekatId, segment], {
      queryParams: { tipPartnera: tip },
    });
  }

  switchIteracija(iteracija: IteracijaProjekta): void {
    const segment = this.tipPartnera === TipPartnera.FINANSIJSKI ? 'finansijski-partneri' : 'robni-partneri';
    const qParams: any = { tipPartnera: this.tipPartnera };
    if (this.status) qParams['status'] = this.status;
    this.router.navigate(['/projekat', iteracija.id, segment], { queryParams: qParams });
  }

  switchIteracijaById(id: number): void {
    const it = this.iteracije.find(i => i.id === +id);
    if (it) this.switchIteracija(it);
  }

  filterByStatus(status: string): void {
    const segment = this.tipPartnera === TipPartnera.FINANSIJSKI ? 'finansijski-partneri' : 'robni-partneri';
    const qParams: any = { tipPartnera: this.tipPartnera };
    if (status) qParams['status'] = status;
    this.router.navigate(['/projekat', this.projekatId, segment], { queryParams: qParams });
  }

  handleRefresh(event: any): void {
    this.kompanijaService.getByIteracija(this.projekatId, this.tipPartnera, this.status || undefined).subscribe({
      next: (data) => { this.partneri = data; event.target.complete(); },
      error: () => { event.target.complete(); },
    });
  }

  ionViewWillEnter(): void {
    this.loadPartneri();
  }

  openDodajPartnere(): void {
    this.router.navigate(['/projekat', this.projekatId, 'dodaj-partnere'], {
      queryParams: { tipPartnera: this.tipPartnera },
    });
  }

  openKreirajPartner(): void {
    this.router.navigate(['/projekat', this.projekatId, 'kreiraj-partner'], {
      queryParams: { tipPartnera: this.tipPartnera },
    });
  }

  async openDetaljiModal(kompanija: KompanijaResponseModel) {
    const modal = await this.modalCtrl.create({
      component: PartnerDetaljiModal,
      componentProps: {
        data: { ...kompanija, iteracijaId: this.projekatId },
        canEdit: this.isAdmin || this.isKoordinator || this.isClan,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) this.loadPartneri();
  }

  getStanjeColor(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno': return 'success';
      case 'Odbijeno': return 'danger';
      case 'Poziv': return 'primary';
      case 'Poslat email': return 'secondary';
      case 'Poslat podsetnik': return 'warning';
      default: return 'medium';
    }
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
