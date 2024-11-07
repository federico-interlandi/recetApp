import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '@core/models/user.model';
import { AuthService } from '@modules/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit, OnDestroy {
  @Input() formType: 'login' | 'register' = 'login';

  formFields: Array<any> = [];
  authForm: FormGroup = new FormGroup({});
  errorMessages: { [key: string]: string } = {};
  observables$: Subscription[] = [];
  errorSession: boolean = false;

  constructor(private fb: FormBuilder, private readonly asAuthService: AuthService, private readonly router: Router) { }


  ngOnInit(): void {
    this.initializeForm();
    this.setFormFields();
  }

  initializeForm(initialValue?: string): void {
    this.authForm = this.fb.group({
      email: [initialValue ? initialValue : '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    },
    {
      validators: this.formType === 'register' ? PasswordMatchValidator('password', 'confirmPassword') : null
    }
    );

    if (this.formType === 'register') {
      this.authForm.get('confirmPassword')?.setValidators([Validators.required]);
    }
  }

  ngOnDestroy(): void {
    this.observables$.forEach((obs) => obs.unsubscribe());
  }

  setFormFields(): void {
    this.formFields = [
      {
        label: 'Dirección de correo electrónico',
        formControlName: 'email',
        type: 'text',
        placeholder: 'Ingrese su email',
        validators: [Validators.required, Validators.email]
      },
      {
        label: 'Contraseña',
        formControlName: 'password',
        type: 'password',
        placeholder: 'Ingrese su contraseña',
        validators: [Validators.required, Validators.minLength(6)]
      }
    ];

    if (this.formType === 'register') {
      this.formFields.push({
        label: 'Repetir Contraseña',
        formControlName: 'confirmPassword',
        type: 'password',
        placeholder: 'Repita su contraseña',
        validators: [Validators.required, Validators.minLength(6)]
      });
    }
  }

  validateField(controlName: string, isInputEvent: boolean): void {
    const control = this.authForm.get(controlName);
    if (control) {
      if (isInputEvent && this.errorMessages[controlName]) {
        this.errorMessages[controlName] = this.getErrorMessage(controlName);
      } else if (!isInputEvent) {
        this.errorMessages[controlName] = this.getErrorMessage(controlName);
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.authForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es obligatorio.';
      } else if (control.errors['email']) {
        return 'Ingrese un correo electrónico válido.';
      } else if (control.errors['minlength']) {
        return `La contraseña debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
      } else if (controlName === 'confirmPassword' && this.authForm.errors?.['mustMatch']) {
        return 'Las contraseñas no coinciden.';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if(this.formType === 'register'){
        this.register();
      }
      else if(this.formType === 'login'){
        this.login();
      }
    }
  }

  changeFormType(type: 'login' | 'register', initialValue?: string): void {
    this.formType = type;
    this.initializeForm(initialValue);
    this.setFormFields();
  }

  private register(): void {
    const user : UserModel = {email: this.authForm.get('email')?.value, password: this.authForm.get('password')?.value};
    const sub = this.asAuthService.register(user).subscribe({
      next: (response: any) => {
        this.changeFormType('login', response.email);
      },
      error: (error: any) => {
        console.log('error from component: ', error);
      }
    });
    this.observables$.push(sub);
  }

  private login(): void {
    const user : UserModel = {email: this.authForm.get('email')?.value, password: this.authForm.get('password')?.value};
    const sub = this.asAuthService.logIn(user).subscribe({
      next: () => {
        this.errorSession = false;
        this.router.navigate(['/', 'recipes']);
      },
      error: (error: any) => {
        this.errorSession = true;
        console.log('error from component: ', error);
      }
    });
    this.observables$.push(sub);
  }

}

export function PasswordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const formGroup = abstractControl as FormGroup;
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
