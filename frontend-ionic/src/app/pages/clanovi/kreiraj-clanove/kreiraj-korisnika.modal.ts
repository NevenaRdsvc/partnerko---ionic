import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner,
  ModalController, ActionSheetController,
} from '@ionic/angular/standalone';
import { IteracijaProjekta } from '../../../core/models/iteracija-projekta';
import { KorisnikService } from '../../../core/services/korisnik.service';

interface ProjekatOption {
  label: string;
  iteracija: IteracijaProjekta | null;
}

@Component({
  selector: 'app-kreiraj-korisnika-modal',
  templateUrl: 'kreiraj-korisnika.modal.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonSpinner,
  ],
})
export class KreirajKorisnikaModal {
  @Input() projekti: ProjekatOption[] = [];
  @Input() selectedIteracijaId: number | null = null;

  form = {
    ime: '',
    prezime: '',
    username: '',
    lozinka: '',
    tip: 'clan',
    iteracijaId: null as number | null,
  };

  tipovi = ['koordinator', 'clan'];
  saving = false;
  errorMsg = '';

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private korisnikService: KorisnikService,
  ) {}

  ngOnInit(): void {
    this.form.iteracijaId = this.selectedIteracijaId;
  }

  get validProjekti(): ProjekatOption[] {
    return this.projekti.filter(p => p.iteracija != null);
  }

  get selectedProjekatLabel(): string {
    return this.validProjekti.find(p => p.iteracija?.id === this.form.iteracijaId)?.label ?? '';
  }

  async openTipSelect(): Promise<void> {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Tip korisnika',
      buttons: [
        ...this.tipovi.map(tip => ({
          text: tip,
          handler: () => { this.form.tip = tip; },
        })),
        { text: 'Otkaži', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  async openProjekatSelect(): Promise<void> {
    const opts = this.validProjekti;
    const sheet = await this.actionSheetCtrl.create({
      header: 'Projekat',
      buttons: [
        ...opts.map(p => ({
          text: p.label,
          handler: () => { this.form.iteracijaId = p.iteracija?.id ?? null; },
        })),
        { text: 'Otkaži', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  sacuvaj(): void {
    const { ime, prezime, username, lozinka, tip, iteracijaId } = this.form;
    if (!ime || !prezime || !username || !lozinka) {
      this.errorMsg = 'Sva polja su obavezna.';
      return;
    }
    if (!iteracijaId) {
      this.errorMsg = 'Morate odabrati projekat.';
      return;
    }
    this.saving = true;
    this.errorMsg = '';
    this.korisnikService
      .create({ ime, prezime, username, lozinka, tip, iteracija_id: iteracijaId })
      .subscribe({
        next: () => this.modalCtrl.dismiss(true),
        error: (err) => {
          this.saving = false;
          this.errorMsg = err?.error?.message ?? 'Greška pri kreiranju korisnika.';
        },
      });
  }

  zatvori(): void {
    this.modalCtrl.dismiss();
  }
}
