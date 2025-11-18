import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-mis-contrataciones',
  templateUrl: './mis-contrataciones.page.html',
  styleUrls: ['./mis-contrataciones.page.scss'],
})
export class MisContratacionesPage implements OnInit {

  lista: any[] = [];
  cargando = false;

  constructor(private supabaseSvc: SupabaseService) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    try {
      this.lista = await this.supabaseSvc.misContratos();
    } finally {
      this.cargando = false;
    }
  }

}
