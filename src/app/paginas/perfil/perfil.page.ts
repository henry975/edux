import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth';

// Componentes individuales de Ionic Standalone
import { 
  AlertController,
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, // Importacion agregada
  IonButton, 
  IonIcon, 
  IonTitle, 
  IonContent, 
  IonAvatar, 
  IonItem, 
  IonInput 
} from '@ionic/angular/standalone';

// Herramientas para hacer visibles los iconos
import { addIcons } from 'ionicons';
import { chevronBack, pencil } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, // Registrado en los imports
    IonButton, 
    IonIcon, 
    IonTitle, 
    IonContent, 
    IonAvatar, 
    IonItem, 
    IonInput
  ]
})
export class PerfilPage {
  nombre: string = 'Henry';
  nombreTemporal: string = '';
  editando: boolean = false;

  private alertaControlador = inject(AlertController);
  private servicioAuth = inject(AuthService);
  private enrutador = inject(Router);

  constructor() {
    // Hace visibles los iconos usados en el HTML
    addIcons({ 'chevron-back': chevronBack, 'pencil': pencil });
  }

  activarEdicion() {
    this.nombreTemporal = this.nombre;
    this.editando = true;
  }

  guardarNombre() {
    if (this.nombreTemporal.trim() !== '') {
      this.nombre = this.nombreTemporal;
    }
    this.editando = false;
  }

  async intentarCerrarSesion() {
    const alerta = await this.alertaControlador.create({
      header: 'Confirmación',
      message: 'Esta a punto de CERRAR SESIÓN pulse CONFIRMAR si esta seguro',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'CONFIRMAR',
          handler: async () => {
            await this.servicioAuth.cerrarSesion();
            this.enrutador.navigate(['/bienvenida']);
          }
        }
      ]
    });
    await alerta.present();
  }

  // Funcion agregada para resolver el error del boton de eliminar cuenta
  async intentarEliminarCuenta() {
    const alerta = await this.alertaControlador.create({
      header: 'Eliminar Cuenta',
      message: '¿Está seguro de que desea ELIMINAR su cuenta de Edux? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'CONFIRMAR',
          handler: async () => {
            try {
              await this.servicioAuth.eliminarCuenta();
              this.mostrarAlertaExito();
            } catch (error: any) {
              this.mostrarAlerta('Seguridad', 'Por motivos de seguridad, debe volver a iniciar sesión antes de realizar esta acción.');
            }
          }
        }
      ]
    });
    await alerta.present();
  }

  async mostrarAlertaExito() {
    const alerta = await this.alertaControlador.create({
      header: 'Éxito',
      message: 'Tu cuenta ha sido eliminada correctamente de la base de datos.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.enrutador.navigate(['/bienvenida']);
          }
        }
      ]
    });
    await alerta.present();
  }

  async mostrarAlerta(encabezado: string, mensaje: string) {
    const alerta = await this.alertaControlador.create({
      header: encabezado,
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();
  }
}