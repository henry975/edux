import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth';

// Componentes individuales para arquitectura Standalone
import { 
  AlertController,
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonItem, 
  IonInput 
} from '@ionic/angular/standalone';

// Herramientas para hacer visibles los iconos
import { addIcons } from 'ionicons';
import { chevronBack, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonItem, 
    IonInput
  ]
})
export class IngresoPage {
  correo: string = '';
  contrasena: string = '';

  private servicioAuth = inject(AuthService);
  private enrutador = inject(Router);
  private alertaControlador = inject(AlertController);

  constructor() {
    // Registro de iconos nativos
    addIcons({ 'chevron-back': chevronBack, 'logo-google': logoGoogle });
  }

  async ingresar() {
    if (!this.correo || !this.contrasena) return;
    try {
      await this.servicioAuth.ingresarConCorreo(this.correo, this.contrasena);
      this.enrutador.navigate(['/inicio']);
    } catch (error) {
      this.mostrarAlerta('Error', 'Credenciales incorrectas, revíselas y vuelva a iniciar sesión.');
    }
  }

  async ingresarConGoogle() {
    try {
      await this.servicioAuth.ingresarConGoogle();
      this.enrutador.navigate(['/inicio']);
    } catch (error: any) {
      this.mostrarAlerta('Error de Google', error.message || 'Ocurrió un problema al iniciar sesión con Google.');
    }
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