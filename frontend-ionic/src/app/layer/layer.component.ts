import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  IonSplitPane, IonMenu, IonContent, IonList,
  IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,
  Platform,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, peopleSharp,
  addCircleOutline, addCircleSharp,
  logOutOutline, logOutSharp,
  chevronForwardOutline,
  checkmarkDoneOutline,
  cubeOutline,
  cashOutline,
  megaphoneOutline,
} from 'ionicons/icons';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-layer',
  templateUrl: 'layer.component.html',
  styleUrls: ['layer.component.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    IonSplitPane, IonMenu, IonContent, IonList,
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,
  ],
})
export class LayerComponent {
  isAuthenticated = false;
  isAdmin = false;
  isKoordinator = false;
  isKompanija = false;
  isClan = false;
  iteracijaId: number | null = null;
  robniOpen = true;
  finansijskiOpen = true;
  currentUrl = '';
  private currentProjekatId: number | null = null;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private platform: Platform,
  ) {
    addIcons({
      peopleOutline, peopleSharp,
      addCircleOutline, addCircleSharp,
      logOutOutline, logOutSharp,
      chevronForwardOutline,
      checkmarkDoneOutline,
      cubeOutline,
      cashOutline,
      megaphoneOutline,
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects as string;
        this.currentUrl = url;
        const match = url.match(/\/projekat\/(\d+)\//);
        if (match) {
          this.currentProjekatId = +match[1];
        }
        this.updateAuthState();
      });

    this.updateAuthState();

    // Handle Android hardware back button — go back if not on a root page
    this.platform.backButton.subscribeWithPriority(10, () => {
      const rootRoutes = ['/projekti', '/moja-zaduzenja', '/promo-materijali', '/nova-iteracija'];
      const onRoot = rootRoutes.some(r => this.currentUrl.startsWith(r));
      if (!onRoot) {
        history.back();
      }
    });
  }

  get isIos(): boolean {
    return this.platform.is('ios');
  }

  private updateAuthState(): void {
    this.isAuthenticated = this.accountService.authenticated();
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');
    this.isKompanija = this.accountService.isInRole('kompanija');
    this.isClan = this.accountService.isInRole('clan');
    this.iteracijaId = this.accountService.getIteracijaId();
  }

  get partneriUrl(): string {
    const id = this.currentProjekatId ?? this.iteracijaId;
    return id ? `/projekat/${id}/robni-partneri` : '/projekti';
  }

  get finansijskiUrl(): string {
    const id = this.currentProjekatId ?? this.iteracijaId;
    return id ? `/projekat/${id}/finansijski-partneri` : '/projekti';
  }

  get clanoviUrl(): string {
    const id = this.currentProjekatId ?? this.iteracijaId;
    return id ? `/projekat/${id}/clanovi` : '/projekti';
  }

  get novaIteracijaQueryParams(): any {
    return this.currentProjekatId ? { projekatId: this.currentProjekatId } : {};
  }

  isNavActive(segment: string, status?: string): boolean {
    if (!this.currentUrl.includes(segment)) return false;
    if (status) return this.currentUrl.includes(`status=${status}`);
    return !this.currentUrl.includes('status=');
  }

  logout(): void {
    this.currentProjekatId = null;
    this.accountService.signOut();
  }
}
