import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSideBarComponent } from './components/header-sidebar/header-sidebar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';



@NgModule({
  declarations: [
    HeaderSideBarComponent,
    ImgBrokenDirective,
    WarningModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderSideBarComponent,
    ImgBrokenDirective,
    WarningModalComponent
  ]
})
export class SharedModule { }
