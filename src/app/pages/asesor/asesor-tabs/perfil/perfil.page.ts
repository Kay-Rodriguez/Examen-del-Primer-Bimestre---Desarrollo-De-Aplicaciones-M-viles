import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: any = null;
  email = '';

  constructor(
    private supabaseSvc: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.perfil = await this.supabaseSvc.getPerfilActual();
    const { data } = await this.supabaseSvc.getUser();
    this.email = data.user?.email || '';
  }

  async logout() {
    await this.supabaseSvc.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
