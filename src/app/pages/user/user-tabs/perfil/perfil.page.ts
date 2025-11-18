import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/core/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfil: any = { nombre_completo:'', telefono:'', email:'' };

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() { await this.cargar(); }

  async cargar() {
    const p = await this.supabase.getPerfilActual();
    const u = (await this.supabase.getUser()).data.user;
    this.perfil = { ...p, email: u?.email };
  }

  async guardar() {
    const u = (await this.supabase.getUser()).data.user;
    await this.supabase.editarPlan; 
    await this.supabase['supabase']?.from; 
  }

  async logout() {
    await this.supabase.logout();
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }
}