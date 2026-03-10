import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonIcon, IonSpinner,
  AlertController, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import { NazivProjekta } from '../../core/enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../../core/models/iteracija-projekta';
import { IteracijaProjektaService } from '../../core/services/iteracija-projekta.service';

interface ProjectCard {
  naziv: NazivProjekta;
  displayNaziv: string;
  image: string;
  trenutna: IteracijaProjekta | null;
  isCreating: boolean;
  createdId: number | null;
  error: string;
}

@Component({
  selector: 'app-nova-iteracija',
  templateUrl: 'nova-iteracija.page.html',
  styleUrls: ['nova-iteracija.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonIcon, IonSpinner,
  ],
})
export class NovaIteracijaPage implements OnInit {
  projekti: ProjectCard[] = [
    { naziv: NazivProjekta.FON_HAKATON, displayNaziv: 'Fon Hakaton',             image: 'assets/images/hahaton.png', trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.HZS,         displayNaziv: 'Hakaton za Srednjoškolce', image: 'assets/images/hzs.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.S2S,         displayNaziv: 'Studenti Studentima',     image: 'assets/images/s2s.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.C2S,         displayNaziv: 'Kompanije Studentima',    image: 'assets/images/c2s.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
  ];

  isLoading = true;

  constructor(
    private iteracijaService: IteracijaProjektaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    addIcons({ addCircleOutline, arrowForwardOutline });
  }

  ngOnInit(): void {
    forkJoin({
      hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
      hzs: this.iteracijaService.findLast(NazivProjekta.HZS),
      s2s: this.iteracijaService.findLast(NazivProjekta.S2S),
      c2s: this.iteracijaService.findLast(NazivProjekta.C2S),
    }).subscribe({
      next: ({ hakaton, hzs, s2s, c2s }) => {
        const map: Record<NazivProjekta, IteracijaProjekta> = {
          [NazivProjekta.FON_HAKATON]: hakaton,
          [NazivProjekta.HZS]: hzs,
          [NazivProjekta.S2S]: s2s,
          [NazivProjekta.C2S]: c2s,
        };
        this.projekti.forEach(p => (p.trenutna = map[p.naziv]));

        const projekatId = +this.route.snapshot.queryParams['projekatId'];
        if (projekatId) {
          this.projekti = this.projekti.filter(p => p.trenutna?.id === projekatId);
        }

        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  async requestConfirm(projekat: ProjectCard): Promise<void> {
    if (!projekat.trenutna) return;
    const novaGodina = projekat.trenutna.godina + 1;

    const alert = await this.alertCtrl.create({
      header: 'Nova iteracija',
      message: `Kreirati novu iteraciju za "${projekat.displayNaziv}" za ${novaGodina}?`,
      buttons: [
        { text: 'Otkaži', role: 'cancel' },
        { text: 'Kreiraj', handler: () => this.kreiraj(projekat) },
      ],
    });
    await alert.present();
  }

  kreiraj(projekat: ProjectCard): void {
    if (!projekat.trenutna || projekat.isCreating) return;
    projekat.isCreating = true;
    projekat.error = '';

    const novaGodina = projekat.trenutna.godina + 1;

    this.iteracijaService.create(projekat.naziv, novaGodina).subscribe({
      next: async (nova) => {
        projekat.isCreating = false;
        projekat.createdId = nova.id;
        if (projekat.trenutna) {
          projekat.trenutna = { ...projekat.trenutna, godina: novaGodina, id: nova.id };
        }
        const toast = await this.toastCtrl.create({
          message: `Iteracija ${novaGodina} kreirana!`,
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: () => {
        projekat.isCreating = false;
        projekat.error = 'Greška pri kreiranju. Pokušajte ponovo.';
      },
    });
  }

  idNaIteraciju(projekat: ProjectCard): void {
    if (!projekat.createdId) return;
    this.router.navigate(['/projekat', projekat.createdId, 'robni-partneri'], {
      queryParams: { tipPartnera: 'robni' },
    });
  }
}
