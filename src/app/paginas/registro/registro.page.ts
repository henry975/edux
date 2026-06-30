import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
// RUTA CORREGIDA: Apunta a auth.ts
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class RegistroPage {
  correo: string = '';
  contrasena: string = '';

  private servicioAuth = inject(AuthService);
  private enrutador = inject(Router);
  private alertaControlador = inject(AlertController);

  async registrar() {
    if (!this.correo || !this.contrasena) return;
    try {
      await this.servicioAuth.registrarConCorreo(this.correo, this.contrasena);
      this.enrutador.navigate(['/verificacion']);
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo registrar. Verifica los datos o intenta con otro correo.');
    }
  }

  async registrarConGoogle() {
    try {
      await this.servicioAuth.ingresarConGoogle();
      this.enrutador.navigate(['/inicio']);
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un problema al conectar con Google.');
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