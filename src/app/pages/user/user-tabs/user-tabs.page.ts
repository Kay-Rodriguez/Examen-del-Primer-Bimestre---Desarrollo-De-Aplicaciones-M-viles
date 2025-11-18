import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/core/supabase';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.page.html',
  styleUrls: ['./user-tabs.page.scss'],
})
export class UserTabsPage implements OnInit {

  constructor(
    private supabaseSvc: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Verificar que haya usuario logueado
    const { data } = await this.supabaseSvc.getUser();
    const user = data?.user;
    if (!user) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return;
    }

    }

}
