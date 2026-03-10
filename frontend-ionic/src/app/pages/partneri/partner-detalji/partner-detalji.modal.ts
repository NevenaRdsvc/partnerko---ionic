import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  forkJoin
} from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonSpinner,
  ModalController,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { Share } from '@capacitor/share';
import {
  addIcons
} from 'ionicons';
import {
  closeOutline, shareOutline
} from 'ionicons/icons';
import {
  KompanijaResponseModel,
  KorisnikModel
} from '../../../core/models/kompanija';
import {
  ClanService
} from '../../../core/services/clan.service';
import {
  KompanijaService
} from '../../../core/services/kompanija.service';
import {
  KorisnikService
} from '../../../core/services/korisnik.service';

@Component({
  selector: 'app-partner-detalji-modal',
  templateUrl: 'partner-detalji.modal.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon,
    IonSpinner,
  ],
})
export class PartnerDetaljiModal implements OnInit {
  @Input() data!: KompanijaResponseModel;
  @Input() canEdit = false;

  korisnici: KorisnikModel[] = [];
  stanja: string[] = [];
  selectedKorisnikId: number | null = null;
  saving = false;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private clanService: ClanService,
    private kompanijaService: KompanijaService,
    private korisnikService: KorisnikService,
  ) {
    addIcons({ closeOutline, shareOutline });
  }

  ngOnInit(): void {
    if (!this.data.stanje) {
      this.data.stanje = 'Nije dodeljeno';
    }
    this.selectedKorisnikId = this.data.korisnikId ?? null;

    this.clanService.getStanja().subscribe(res => (this.stanja = res));

    if (this.data.iteracijaId) {
      this.korisnikService.getByProject(this.data.iteracijaId).subscribe({
        next: (res) => (this.korisnici = res),
        error: () => (this.korisnici = []),
      });
    }
  }

  sacuvaj() {
    this.saving = true;

    const kompanijaUpdate$ = this.kompanijaService.updateKompanija(this.data.ID, {
      naziv: this.data.naziv,
      websajt: this.data.websajt,
      kontakt: this.data.kontakt,
    });

    if (!this.data.iteracijaId) {
      kompanijaUpdate$.subscribe({
        next: () => {
          this.saving = false;
          this.modalCtrl.dismiss(true);
        },
        error: () => {
          this.saving = false;
        },
      });
      return;
    }

    const iteracijaPayload: Record < string, any > = {
      stanje: this.data.stanje,
      korisnik_id: this.selectedKorisnikId ?? undefined,
    };
    if (this.data.napomena != null) iteracijaPayload['napomena'] = this.data.napomena;

    forkJoin({
      kompanija: kompanijaUpdate$,
      iteracija: this.kompanijaService.updateKompanijaIteracija(
        this.data.ID,
        this.data.iteracijaId,
        iteracijaPayload,
      ),
    }).subscribe({
      next: () => {
        this.saving = false;
        this.modalCtrl.dismiss(true);
      },
      error: () => {
        this.saving = false;
      },
    });
  }

  get selectedKorisnikLabel(): string {
    if (!this.selectedKorisnikId) return '— Nije dodeljeno —';
    const k = this.korisnici.find(k => k.id === this.selectedKorisnikId);
    return k ? `${k.ime} ${k.prezime}` : '— Nije dodeljeno —';
  }

  async openStanjeSelect(): Promise<void> {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Stanje',
      buttons: [
        ...this.stanja.map(s => ({
          text: s,
          handler: () => { this.data.stanje = s; },
        })),
        { text: 'Otkaži', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  async openKorisnikSelect(): Promise<void> {
    const opts = [
      { id: null as number | null, label: '— Nije dodeljeno —' },
      ...this.korisnici.map(k => ({ id: k.id, label: `${k.ime} ${k.prezime}` })),
    ];
    const sheet = await this.actionSheetCtrl.create({
      header: 'Zadužen',
      buttons: [
        ...opts.map(o => ({
          text: o.label,
          handler: () => { this.selectedKorisnikId = o.id; },
        })),
        { text: 'Otkaži', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  async share(): Promise<void> {
    const { value } = await Share.canShare();
    if (!value) return;

    const lines = [this.data.naziv];
    if (this.data.websajt) lines.push(`Websajt: ${this.data.websajt}`);
    if (this.data.kontakt) lines.push(`Kontakt: ${this.data.kontakt}`);

    await Share.share({
      title: this.data.naziv,
      text: lines.join('\n'),
      dialogTitle: 'Podeli partnera',
    });
  }

  zatvori() {
    this.modalCtrl.dismiss(false);
  }
}
