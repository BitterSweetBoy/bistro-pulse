import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { AppLayout } from './layout/components/app.layout';
import { authGuard } from './shared/guards/auth.guard';
import { CrearRestauranteComponent } from './restaurantes/crear-restaurante/crear-restaurante.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: '', component: AuthComponent, 
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegistrationComponent}
        ]
    },
    {
        path: 'dashboard', component: AppLayout,
        canActivate: [authGuard]
    },
    {
        path: 'restaurantes', component: AppLayout,
        children: [
            {path: 'nuevo-restaurante', component: CrearRestauranteComponent},
        ]
    }
];
