import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para el *ngIf
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class PerfilPage {
  nombre: string = 'Desconocido';
  nombreTemporal: string = '';
  editando: boolean = false;

  private alertaControlador = inject(AlertController);
  private servicioAuth = inject(AuthService);
  private enrutador = inject(Router);

  // Funciones para editar el nombre
  activarEdicion() {
    this.nombreTemporal = this.nombre; // Copia el nombre actual al input
    this.editando = true;
  }

  guardarNombre() {
    if (this.nombreTemporal.trim() !== '') {
      this.nombre = this.nombreTemporal;
    }
    this.editando = false;
  }

  // Función para cerrar sesión con ventana de confirmación
  async intentarCerrarSesion() {
    const alerta = await this.alertaControlador.create({
      header: 'Confirmación',
      message: 'Esta a punto de CERRAR SESIÓN pulse CONFIRMAR si esta seguro',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel' // Role cancel cierra la alerta sin hacer nada
        },
        {
          text: 'CONFIRMAR',
          handler: async () => {
            // Si confirma, cierra sesión en Firebase y vuelve al inicio
            await this.servicioAuth.cerrarSesion();
            this.enrutador.navigate(['/bienvenida']);
          }
        }
      ]
    });

    await alerta.present();
  }
}