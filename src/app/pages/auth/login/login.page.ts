import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private supabaseSvc: SupabaseService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async loginRol(rol: 'usuario' | 'asesor') {
    const loading = await this.loadingCtrl.create({ message: 'Ingresando...' });
    await loading.present();

    try {
      await this.supabaseSvc.signIn(this.email, this.password);
      const perfil = await this.supabaseSvc.getPerfilActual();

      if (rol === 'usuario' && perfil?.rol === 'usuario_registrado') {
        this.router.navigateByUrl('/user/home', { replaceUrl: true });
      } else if (rol === 'asesor' && perfil?.rol === 'asesor_comercial') {
        this.router.navigateByUrl('/asesor/dashboard', { replaceUrl: true });
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Rol incorrecto',
          message: 'No tienes permisos para ingresar como ' + rol,
          buttons: ['OK']
        });
        await alert.present();
      }

    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message ?? 'Error al iniciar sesión',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }
}
