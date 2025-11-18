import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nombre = '';
  email = '';
  telefono = '';
  password = '';

  constructor(
    private supabaseSvc: SupabaseService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async registrar() {

    // -------------------------------
    // VALIDACIONES
    // -------------------------------

    if (!this.nombre || !this.email || !this.telefono || !this.password) {
      return this.toast("Todos los campos son obligatorios", "danger");
    }

    if (!this.email.includes('@')) {
      return this.toast("Correo inválido", "danger");
    }

    if (this.password.length < 6) {
      return this.toast("La contraseña debe tener mínimo 6 caracteres", "danger");
    }

    const loading = await this.loadingCtrl.create({ message: 'Creando cuenta...' });
    await loading.present();

    try {
      await this.supabaseSvc.signUp(
        this.nombre,
        this.email,
        this.password,
        this.telefono
      );

      // -------------------------------
      // MENSAJE DE ÉXITO
      // -------------------------------
      await this.toast("Cuenta creada. Revisa tu correo y luego inicia sesión.", "success");

      this.router.navigateByUrl('/login', { replaceUrl: true });

    } catch (error: any) {
      this.toast(error.message ?? 'Error al registrar', "danger");

    } finally {
      loading.dismiss();
    }
  }

  // ------------------------
  // TOAST GLOBAL
  // ------------------------
  async toast(message: string, color: "success" | "danger" = "danger") {
    const t = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: "top"     
    });
    t.present();
  }

}
