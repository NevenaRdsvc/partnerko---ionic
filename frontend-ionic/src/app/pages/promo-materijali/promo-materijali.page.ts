import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonButton, IonIcon,
  IonSearchbar, IonSpinner,
  IonFab, IonFabButton, IonModal,
  AlertController, ToastController, ActionSheetController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cloudUploadOutline, trashOutline, openOutline, refreshOutline,
  documentOutline, videocamOutline, attachOutline,
} from 'ionicons/icons';
import { KompanijaBasicModel } from '../../core/models/kompanija';
import { MaterijaliModel } from '../../core/models/materijali';
import { AccountService } from '../../core/services/account.service';
import { KompanijaService } from '../../core/services/kompanija.service';
import { MaterijaliService } from '../../core/services/materijali.service';

@Component({
  selector: 'app-promo-materijali',
  templateUrl: 'promo-materijali.page.html',
  styleUrls: ['promo-materijali.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonButton, IonIcon,
    IonSearchbar, IonSpinner,
    IonFab, IonFabButton, IonModal,
  ],
})
export class PromoMaterijaliPage implements OnInit {
  isAdmin = false;
  isKoordinator = false;

  kompanije: KompanijaBasicModel[] = [];
  selectedKompanijaId: number | null = null;
  selectedFile: File | null = null;
  isUploading = false;
  isSyncing = false;
  uploadError = '';
  fileName = '';

  materijali: MaterijaliModel[] = [];
  searchTerm = '';
  selectedMaterial: MaterijaliModel | null = null;
  isUploadModalOpen = false;

  constructor(
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private materijaliService: MaterijaliService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
  ) {
    addIcons({ cloudUploadOutline, trashOutline, openOutline, refreshOutline, documentOutline, videocamOutline, attachOutline });
  }

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');

    if (this.isAdmin || this.isKoordinator) {
      this.kompanijaService.getAll().subscribe({ next: (data) => (this.kompanije = data) });
    }

    this.loadMaterijali();
  }

  private loadMaterijali(): void {
    this.materijaliService.getAll(this.searchTerm || undefined).subscribe({
      next: (data) => (this.materijali = data),
    });
  }

  onSearch(event: any): void {
    this.searchTerm = event.detail.value || '';
    this.loadMaterijali();
  }

  syncTags(): void {
    this.isSyncing = true;
    this.materijaliService.syncTags().subscribe({
      next: async (res) => {
        this.isSyncing = false;
        this.loadMaterijali();
        const toast = await this.toastCtrl.create({
          message: `Tagovi ažurirani (${res.updated})`,
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: () => { this.isSyncing = false; },
    });
  }

  get materijaliPoKompaniji(): { naziv: string; stavke: MaterijaliModel[] }[] {
    const map = new Map<string, MaterijaliModel[]>();
    for (const m of this.materijali) {
      const naziv = m.kompanija?.naziv ?? 'Nepoznato';
      if (!map.has(naziv)) map.set(naziv, []);
      map.get(naziv)!.push(m);
    }
    return Array.from(map.entries()).map(([naziv, stavke]) => ({ naziv, stavke }));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  upload(): void {
    if (!this.selectedFile || !this.selectedKompanijaId) return;
    this.isUploading = true;
    this.uploadError = '';

    this.materijaliService.upload(this.selectedFile, this.selectedKompanijaId).subscribe({
      next: async () => {
        this.selectedFile = null;
        this.fileName = '';
        this.isUploading = false;
        this.isUploadModalOpen = false;
        this.selectedKompanijaId = null;
        this.loadMaterijali();
        const toast = await this.toastCtrl.create({
          message: 'Materijal uspešno uploadovan',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: () => {
        this.uploadError = 'Greška pri uploadu. Pokušajte ponovo.';
        this.isUploading = false;
      },
    });
  }

  async confirmDelete(material: MaterijaliModel) {
    const alert = await this.alertCtrl.create({
      header: 'Potvrdi brisanje',
      message: `Da li ste sigurni da želite obrisati "${material.originalnoIme}"?`,
      buttons: [
        { text: 'Otkaži', role: 'cancel' },
        {
          text: 'Obriši',
          role: 'destructive',
          handler: () => this.executeDelete(material.id),
        },
      ],
    });
    await alert.present();
  }

  private executeDelete(id: number): void {
    this.materijaliService.delete(id).subscribe({
      next: () => {
        this.materijali = this.materijali.filter(m => m.id !== id);
        if (this.selectedMaterial?.id === id) this.selectedMaterial = null;
      },
    });
  }

  openMaterial(m: MaterijaliModel): void {
    this.selectedMaterial = m;
  }

  closeMaterial(): void {
    this.selectedMaterial = null;
  }

  get selectedKompanijaNaziv(): string {
    return this.kompanije.find(k => k.id === this.selectedKompanijaId)?.naziv ?? '';
  }

  async openKompanijaSelect(): Promise<void> {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Kompanija',
      buttons: [
        ...this.kompanije.map(k => ({
          text: k.naziv,
          handler: () => { this.selectedKompanijaId = k.id; },
        })),
        { text: 'Otkaži', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  isVideo(url: string): boolean {
    return /\.(mp4|mov|avi|webm|mkv)(\?.*)?$/i.test(url);
  }

  isImage(url: string): boolean {
    return /\.(jpe?g|png|gif|webp|svg|bmp|tiff?)(\?.*)?$/i.test(url);
  }

  images(items: MaterijaliModel[]): MaterijaliModel[] {
    return items.filter(m => this.isImage(m.url));
  }

  nonImages(items: MaterijaliModel[]): MaterijaliModel[] {
    return items.filter(m => !this.isImage(m.url));
  }
}
