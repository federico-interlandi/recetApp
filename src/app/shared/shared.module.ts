import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSideBarComponent } from './components/header-sidebar/header-sidebar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    HeaderSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderSideBarComponent
  ]
})
export class SharedModule { }
