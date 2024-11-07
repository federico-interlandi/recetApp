import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSideBarComponent } from './components/header-sidebar/header-sidebar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';



@NgModule({
  declarations: [
    HeaderSideBarComponent,
    ImgBrokenDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderSideBarComponent,
    ImgBrokenDirective
  ]
})
export class SharedModule { }
