import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  forkJoin
} from 'rxjs';
import {
  CommonModule
} from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonLabel,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import {
  addIcons
} from 'ionicons';
import {
  addOutline,
  personOutline,
  trashOutline
} from 'ionicons/icons';
import {
  NazivProjekta
} from '../../core/enums/naziv-projekta.enum';
import {
  IteracijaProjekta
} from '../../core/models/iteracija-projekta';
import {
  KorisnikModel
} from '../../core/models/kompanija';
import {
  AccountService
} from '../../core/services/account.service';
import {
  IteracijaProjektaService
} from '../../core/services/iteracija-projekta.service';
import {
  KorisnikService
} from '../../core/services/korisnik.service';
import {
  KreirajKorisnikaModal
} from './kreiraj-clanove/kreiraj-korisnika.modal';

interface ProjekatTab {
  naziv: NazivProjekta;
  label: string;
  shortLabel: string;
  image: string;
  iteracija: IteracijaProjekta | null;
}

@Component({
  selector: 'app-clanovi',
  templateUrl: 'clanovi.page.html',
  styleUrls: ['clanovi.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonIcon, IonLabel,
    IonSpinner, IonSegment, IonSegmentButton, IonFab, IonFabButton,
    IonRefresher, IonRefresherContent,
  ],
})
export class ClanoviPage implements OnInit {
  projekti: ProjekatTab[] = [
    { naziv: NazivProjekta.FON_HAKATON, label: 'Fon Hakaton',            shortLabel: 'FH',  image: 'assets/images/hahaton.png', iteracija: null },
    { naziv: NazivProjekta.HZS,         label: 'Hakaton za Srednjoškolce', shortLabel: 'HZS', image: 'assets/images/hzs.png',     iteracija: null },
    { naziv: NazivProjekta.S2S,         label: 'Studenti Studentima',    shortLabel: 'S2S', image: 'assets/images/s2s.png',     iteracija: null },
    { naziv: NazivProjekta.C2S,         label: 'Kompanije Studentima',   shortLabel: 'C2S', image: 'assets/images/c2s.png',     iteracija: null },
  ];

  selectedProjekat: ProjekatTab | null = null;
  clanovi: KorisnikModel[] = [];
  loadingClanovi = false;
  errorMsg = '';
  isAdmin = false;
  isKoordinator = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private korisnikService: KorisnikService,
    private iteracijaService: IteracijaProjektaService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
    addIcons({
      addOutline,
      personOutline,
      trashOutline
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');

    forkJoin({
      hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
      hzs: this.iteracijaService.findLast(NazivProjekta.HZS),
      s2s: this.iteracijaService.findLast(NazivProjekta.S2S),
      c2s: this.iteracijaService.findLast(NazivProjekta.C2S),
    }).subscribe(({
      hakaton,
      hzs,
      s2s,
      c2s
    }) => {
      const map: Record < NazivProjekta, IteracijaProjekta > = {
        [NazivProjekta.FON_HAKATON]: hakaton,
        [NazivProjekta.HZS]: hzs,
        [NazivProjekta.S2S]: s2s,
        [NazivProjekta.C2S]: c2s,
      };
      this.projekti.forEach(p => (p.iteracija = map[p.naziv]));

      this.route.params.subscribe(params => {
        const idFromRoute = +params['id'];
        const match = this.projekti.find(p => p.iteracija?.id === idFromRoute);
        this.selectProjekat(match ?? this.projekti[0]);
      });
    });
  }

  selectProjekatByNaziv(naziv: NazivProjekta): void {
    const p = this.projekti.find(p => p.naziv === naziv) ?? this.projekti[0];
    this.selectProjekat(p);
  }

  selectProjekat(p: ProjekatTab): void {
    this.selectedProjekat = p;
    this.errorMsg = '';
    if (p.iteracija) this.loadClanove(p.iteracija.id);
  }

  get iteracijaId(): number | null {
    return this.selectedProjekat?.iteracija?.id ?? null;
  }

  private loadClanove(iteracijaId: number): void {
    this.loadingClanovi = true;
    this.korisnikService.getByProject(iteracijaId).subscribe({
      next: (data) => {
        this.clanovi = data;
        this.loadingClanovi = false;
      },
      error: () => (this.loadingClanovi = false),
    });
  }

  handleRefresh(event: any): void {
    if (this.iteracijaId) {
      this.loadClanove(this.iteracijaId);
    }
    event.target.complete();
  }

  async openKreirajModal(): Promise < void > {
    const modal = await this.modalCtrl.create({
      component: KreirajKorisnikaModal,
      componentProps: {
        projekti: this.projekti,
        selectedIteracijaId: this.iteracijaId,
      },
    });
    await modal.present();
    const {
      data
    } = await modal.onDidDismiss();
    if (data) this.loadClanove(this.iteracijaId!);
  }

  async ukloni(clan: KorisnikModel): Promise < void > {
    if (!this.iteracijaId) return;
    this.korisnikService.removeFromIteracija(clan.id, this.iteracijaId).subscribe({
      next: async () => {
        this.loadClanove(this.iteracijaId!);
        const toast = await this.toastCtrl.create({
          message: 'Član uklonjen.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: (err) => (this.errorMsg = err?.error?.message ?? 'Greška pri uklanjanju.'),
    });
  }
}
