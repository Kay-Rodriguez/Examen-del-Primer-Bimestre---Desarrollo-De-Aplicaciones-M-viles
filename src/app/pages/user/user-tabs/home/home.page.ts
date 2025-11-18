import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  filtro = '';
  planes: any[] = [];
  cargando = false;

  constructor(
    private supabaseSvc: SupabaseService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.cargarPlanes();
  }

  get planesFiltrados() {
    const f = this.filtro.toLowerCase();
    return this.planes.filter(p =>
      (p.nombre || '').toLowerCase().includes(f) ||
      (p.segmento || '').toLowerCase().includes(f) ||
      (p.publico_objetivo || '').toLowerCase().includes(f)
    );
  }

  async cargarPlanes() {
    this.cargando = true;
    try {
      this.planes = await this.supabaseSvc.getPlanesPublicos();
    } catch (err) {
      console.error(err);
      this.toast('Error al cargar planes');
    } finally {
      this.cargando = false;
    }
  }

  toggleDetalle(p: any) {
    p._show = !p._show;
  }

  async contratar(p: any) {
    const loading = await this.loadingCtrl.create({ message: 'Enviando solicitud...' });
    await loading.present();

    try {
      await this.supabaseSvc.contratarPlan(p.id);
      this.toast('Solicitud enviada. Un asesor te contactará.');
    } catch (err) {
      console.error(err);
      this.toast('No se pudo enviar la solicitud');
    } finally {
      loading.dismiss();
    }
  }

  async toast(msg: string) {
    const t = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      color: 'primary',
      position: 'top'
    });
    t.present();
  }

}
