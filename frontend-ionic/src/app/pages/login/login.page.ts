import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, IonNote, IonSpinner, IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, personOutline, lockClosedOutline } from 'ionicons/icons';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton, IonNote, IonSpinner, IonIcon,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
  ) {
    addIcons({ eyeOutline, eyeOffOutline, personOutline, lockClosedOutline });
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.accountService.signIn(this.loginForm.value).subscribe({
      next: () => {
        if (this.accountService.isInRole('kompanija')) {
          this.router.navigate(['/promo-materijali']);
        } else if (this.accountService.isInRole('admin')) {
          this.router.navigate(['/projekti']);
        } else {
          const iteracijaId = this.accountService.getIteracijaId();
          if (iteracijaId) {
            this.router.navigate(['/projekat', iteracijaId, 'robni-partneri'], {
              queryParams: { tipPartnera: 'robni' },
            });
          } else {
            this.router.navigate(['/projekti']);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Pogrešno korisničko ime ili lozinka.';
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
