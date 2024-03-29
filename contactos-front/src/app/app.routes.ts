import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'usuario', component: UsuarioComponent
    },

    {
        path: 'Recuperar-password', component: RecuperarPasswordComponent
    },

    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
