import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
