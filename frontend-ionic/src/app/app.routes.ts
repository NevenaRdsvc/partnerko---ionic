import { Routes } from '@angular/router';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { unauthenticatedGuard } from './core/guards/unauthenticated.guard';
import { adminGuard } from './core/guards/admin.guard';
import { projectGuard } from './core/guards/project.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [unauthenticatedGuard],
  },
  {
    path: '',
    loadComponent: () => import('./layer/layer.component').then(m => m.LayerComponent),
    canActivate: [authenticatedGuard],
    children: [
      {
        path: 'projekti',
        loadComponent: () => import('./pages/projekti/projekti.page').then(m => m.ProjektiPage),
      },
      {
        path: 'projekat/:id/robni-partneri',
        loadComponent: () => import('./pages/partneri/partneri.page').then(m => m.PartneriPage),
        canActivate: [projectGuard],
      },
      {
        path: 'projekat/:id/finansijski-partneri',
        loadComponent: () => import('./pages/partneri/partneri.page').then(m => m.PartneriPage),
        canActivate: [projectGuard],
      },
      {
        path: 'promo-materijali',
        loadComponent: () => import('./pages/promo-materijali/promo-materijali.page').then(m => m.PromoMaterijaliPage),
      },
      {
        path: 'projekat/:id/clanovi',
        loadComponent: () => import('./pages/clanovi/clanovi.page').then(m => m.ClanoviPage),
      },
      {
        path: 'nova-iteracija',
        loadComponent: () => import('./pages/nova-iteracija/nova-iteracija.page').then(m => m.NovaIteracijaPage),
        canActivate: [adminGuard],
      },
      {
        path: 'moja-zaduzenja',
        loadComponent: () => import('./pages/moja-zaduzenja/moja-zaduzenja.page').then(m => m.MojaZaduzenjaPage),
      },
      {
        path: 'projekat/:id/dodaj-partnere',
        loadComponent: () => import('./pages/partneri/dodaj-partnere/dodaj-partnere.page').then(m => m.DodajPartneriPage),
        canActivate: [projectGuard],
      },
      {
        path: 'projekat/:id/kreiraj-partner',
        loadComponent: () => import('./pages/partneri/kreiraj-partner/kreiraj-partner.page').then(m => m.KreirajPartnerPage),
        canActivate: [projectGuard],
      },
    ],
  },
];
