import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  lista: any[] = [];
  cargando: boolean = false; // <-- SE AGREGA ESTA LÍNEA

  constructor(private supabaseSvc: SupabaseService) {}

  ngOnInit() {
    this.cargar();
  }

  async cargar() {
    this.cargando = true; // inicia carga
    this.lista = await this.supabaseSvc.asesorSolicitudes();
    this.cargando = false; // termina carga
  }

  async aprobar(id: number) {
    await this.supabaseSvc.cambiarEstado(id, 'aprobado');
    this.cargar();
  }

  async rechazar(id: number) {
    await this.supabaseSvc.cambiarEstado(id, 'rechazado');
    this.cargar();
  }

}
