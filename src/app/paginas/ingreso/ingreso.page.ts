import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class IngresoPage {
  correo: string = '';
  contrasena: string = '';

  private servicioAuth = inject(AuthService);
  private enrutador = inject(Router);
  private alertaControlador = inject(AlertController);

  async ingresar() {
    if (!this.correo || !this.contrasena) return;
    try {
      await this.servicioAuth.ingresarConCorreo(this.correo, this.contrasena);
      // Si las credenciales son correctas, entra a la app
      this.enrutador.navigate(['/inicio']);
    } catch (error) {
      // Mensaje exacto de error solicitado
      this.mostrarAlerta('Error', 'Credenciales incorrectas, revíselas y vuelva a iniciar sesión.');
    }
  }

  async ingresarConGoogle() {
    try {
      await this.servicioAuth.ingresarConGoogle();
      this.enrutador.navigate(['/inicio']);
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un problema al iniciar sesión con Google.');
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