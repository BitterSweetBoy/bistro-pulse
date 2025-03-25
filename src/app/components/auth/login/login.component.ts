import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/Services/auth.service';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MessageModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent{

  form: FormGroup;
  isSubmitted: boolean = false;

  authService = inject(AuthService);

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    effect(() => {
      if (this.authService.authState().loggedIn) {
        console.log('hola')
        this.router.navigate(['/dashboard']);
      }
    });
  }


  onSubmit(){
    this.isSubmitted = true;
    if(!this.form.valid){
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario no válido',
        detail: 'Corrige los erroes antes de continuar'
      });
      return
    }
    this.authService.loginUser(this.form.value).pipe(
      finalize( () => this.isSubmitted = false )
    ).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Inicio de sesión exitoso'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al iniciar sesión'
        });
      }
    })
  }

  hasDisplayError(controlName: string){
    const control = this.form.get(controlName) 
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

}
