import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrl: './header-sidebar.component.css'
})
export class HeaderSideBarComponent implements OnInit {

  public mainMenu : Array<any> = [];

  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.mainMenu = [
      {
        name: 'Recetas',
        router: ['/']
      },
      {
        name: 'Favoritos',
        router: ['/', 'favorites']
      }
    ];
  }
}
