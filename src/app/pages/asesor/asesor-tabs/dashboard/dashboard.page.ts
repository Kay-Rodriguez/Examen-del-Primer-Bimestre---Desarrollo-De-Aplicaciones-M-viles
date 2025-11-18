import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  planes: any[] = [];
  cargando = false;

  // Formulario crear/editar
  mostrarForm = false;
  editando = false;
  planActual: any = this.nuevoPlanModelo();
  imagenFile: File | null = null;

  constructor(private supabaseSvc: SupabaseService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.cargarPlanes();
  }

  ionViewWillEnter() {
    this.cargarPlanes();
  }

  nuevoPlanModelo() {
    return {
      id: null,
      nombre: '',
      precio_mensual: null,
      gb_datos: null,
      minutos: null,
      descripcion: '',
      promocion: '',
      imagen_url: '',
      segmento: '',
      publico_objetivo: '',
      activo: true
    };
  }

  async cargarPlanes() {
    this.cargando = true;
    this.planes = await this.supabaseSvc.getPlanesPublicosAsesor();
    this.cargando = false;
  }

  // Abrir formulario en modo crear
  abrirCrear() {
    this.editando = false;
    this.planActual = this.nuevoPlanModelo();
    this.imagenFile = null;
    this.mostrarForm = true;
  }

  // Abrir formulario en modo editar
  abrirEditar(plan: any) {
    this.editando = true;
    this.planActual = { ...plan };
    this.imagenFile = null;
    this.mostrarForm = true;
  }

  cerrarForm() {
    this.mostrarForm = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenFile = file;
    }
    
  }
  
async guardarPlan() {
  try {
    let datos = { ...this.planActual };

    // SUBIR IMAGEN SI EXISTE
    if (this.imagenFile) {
      const url = await this.supabaseSvc.uploadImage(this.imagenFile);
      datos.imagen_url = url;
    }

    if (this.editando) {
      // EDITAR (ID EXISTE)
      await this.supabaseSvc.editarPlan(datos.id, datos);
    } else {
      // CREAR (NO MANDES ID)
      delete datos.id;
      await this.supabaseSvc.crearPlan(datos);
    }

    const toast = await this.toastCtrl.create({
      message: this.editando ? 'Plan actualizado correctamente' : 'Plan creado correctamente',
      color: 'success',
      duration: 2000
    });
    toast.present();

    this.cerrarForm();
    this.cargarPlanes();

  } catch (err) {
    console.error(err);
    const toast = await this.toastCtrl.create({
      message: 'No se pudo guardar el plan',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}


  async eliminar(plan: any) {
    if (!confirm('¿Eliminar este plan?')) return;
    await this.supabaseSvc.eliminarPlan(plan.id);
    await this.cargarPlanes();
  }

  // Cambiar estado activo/inactivo
  async toggleActivo(plan: any) {
    await this.supabaseSvc.editarPlan(plan.id, { activo: !plan.activo });
    await this.cargarPlanes();
  }

}
