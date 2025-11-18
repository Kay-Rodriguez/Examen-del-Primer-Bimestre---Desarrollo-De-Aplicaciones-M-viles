import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, OnDestroy {

  contratos: any[] = [];
  seleccionado: any = null;

  mensajes: any[] = [];
  nuevoMensaje = '';

  canal: any = null;

  constructor(private supabaseSvc: SupabaseService) {}

  ngOnInit() {
    this.cargarContratos();
  }

  ngOnDestroy() {
    if (this.canal) {
      this.canal.unsubscribe();
    }
  }

  async cargarContratos() {
    this.contratos = await this.supabaseSvc.contratosAprobadosAsesor();
  }

  async abrirChat(c: any) {
    this.seleccionado = c;
    this.mensajes = await this.supabaseSvc.obtenerMensajes(c.id);

    if (this.canal) {
      this.canal.unsubscribe();
    }

    this.canal = this.supabaseSvc.escucharChat(c.id, (msg: any) => {
      this.mensajes = [...this.mensajes, msg];
    });
  }

  async enviar() {
    if (!this.nuevoMensaje.trim() || !this.seleccionado) return;
    await this.supabaseSvc.enviarMensaje(this.seleccionado.id, this.nuevoMensaje.trim());
    this.nuevoMensaje = '';
  }

}
