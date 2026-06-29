import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'saludo',
    pathMatch: 'full',
  },
  {
    path: 'saludo',
    loadComponent: () => import('./paginas/saludo/saludo.page').then(m => m.SaludoPage)
  },
  {
    path: 'bienvenida',
    loadComponent: () => import('./paginas/bienvenida/bienvenida.page').then(m => m.BienvenidaPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'verificacion',
    loadComponent: () => import('./paginas/verificacion/verificacion.page').then(m => m.VerificacionPage)
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./paginas/ingreso/ingreso.page').then(m => m.IngresoPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./paginas/perfil/perfil.page').then(m => m.PerfilPage)
  },
];