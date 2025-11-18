import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private supabaseSvc: SupabaseService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {

    const { data } = await this.supabaseSvc.getUser();
    const user = data?.user;

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
