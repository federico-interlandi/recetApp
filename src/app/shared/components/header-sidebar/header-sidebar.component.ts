import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrl: './header-sidebar.component.css'
})
export class HeaderSideBarComponent implements OnInit {

  public mainMenu : Array<any> = [];

  constructor(private readonly router: Router, private asAuthService: AuthService) { }

  ngOnInit() {
    this.mainMenu = [
      {
        name: 'Recetas',
        router: ['/', 'recipes']
      },
      {
        name: 'Favoritos',
        router: ['/', 'favorites']
      }
    ];
  }

  logOut(): void {
    this.asAuthService.logOut();
    this.router.navigate(['/auth']);
  }
}
