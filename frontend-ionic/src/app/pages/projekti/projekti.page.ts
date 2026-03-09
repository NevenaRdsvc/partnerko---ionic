import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonSpinner, IonRefresher, IonRefresherContent,
} from '@ionic/angular/standalone';
import { NazivProjekta } from '../../core/enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../../core/models/iteracija-projekta';
import { IteracijaProjektaService } from '../../core/services/iteracija-projekta.service';

interface ProjectCard {
  iteracija: IteracijaProjekta;
  displayNaziv: string;
  image: string;
}

@Component({
  selector: 'app-projekti',
  templateUrl: 'projekti.page.html',
  styleUrls: ['projekti.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonSpinner, IonRefresher, IonRefresherContent,
  ],
})
export class ProjektiPage implements OnInit {
  projects: ProjectCard[] = [];
  isLoading = true;

  private readonly displayNazivMap: Record<NazivProjekta, string> = {
    [NazivProjekta.FON_HAKATON]: 'Fon Hakaton',
    [NazivProjekta.HZS]: 'Hakaton za Srednjoškolce',
    [NazivProjekta.S2S]: 'Studenti Studentima',
    [NazivProjekta.C2S]: 'Kompanije Studentima',
  };

  private readonly imageMap: Record<NazivProjekta, string> = {
    [NazivProjekta.FON_HAKATON]: 'assets/images/hahaton.png',
    [NazivProjekta.HZS]:         'assets/images/hzs.png',
    [NazivProjekta.S2S]:         'assets/images/s2s.png',
    [NazivProjekta.C2S]:         'assets/images/c2s.png',
  };

  constructor(
    private router: Router,
    private iteracijaService: IteracijaProjektaService,
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects(complete?: () => void): void {
    forkJoin({
      hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
      hzs: this.iteracijaService.findLast(NazivProjekta.HZS),
      s2s: this.iteracijaService.findLast(NazivProjekta.S2S),
      c2s: this.iteracijaService.findLast(NazivProjekta.C2S),
    }).subscribe({
      next: (results) => {
        this.projects = Object.values(results).map(iteracija => ({
          iteracija,
          displayNaziv: this.displayNazivMap[iteracija.naziv_projekta],
          image: this.imageMap[iteracija.naziv_projekta],
        }));
        this.isLoading = false;
        complete?.();
      },
      error: () => { this.isLoading = false; complete?.(); },
    });
  }

  handleRefresh(event: any): void {
    this.loadProjects(() => event.target.complete());
  }

  goToProject(id: number) {
    this.router.navigate(['/projekat', id, 'robni-partneri'], {
      queryParams: { tipPartnera: 'robni' },
    });
  }
}
