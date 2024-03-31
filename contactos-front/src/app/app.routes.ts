import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login', loadComponent: () => import('./login/login.component')
    },

    {
        path: 'usuario', loadComponent: ()=> import('./usuario/usuario.component')
    },

    {
        path: 'Recuperar-password', loadComponent: ()=> import('./recuperar-password/recuperar-password.component')
    },
    
    {
        path: 'contactos', loadComponent: ()=> import('./contactos/contactos.component')
    },

    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
];
