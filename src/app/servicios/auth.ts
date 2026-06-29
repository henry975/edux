import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  sendEmailVerification,
  user
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyección de dependencias en Angular Standalone
  private auth = inject(Auth);

  // Observable que nos permite escuchar si hay un usuario activo o no
  public usuario$ = user(this.auth);

  constructor() { }

  // 1. Registro con correo, contraseña y envío de verificación
  async registrarConCorreo(correo: string, contrasena: string) {
    const credenciales = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
    // Envía automáticamente el enlace al correo ingresado
    await sendEmailVerification(credenciales.user);
    return credenciales;
  }

  // 2. Ingreso con correo y contraseña
  async ingresarConCorreo(correo: string, contrasena: string) {
    return await signInWithEmailAndPassword(this.auth, correo, contrasena);
  }

  // 3. Ingreso con cuenta de Google
  async ingresarConGoogle() {
    const proveedorGoogle = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, proveedorGoogle);
  }

  // 4. Cerrar sesión
  async cerrarSesion() {
    return await signOut(this.auth);
  }

  // 5. Obtener los datos del usuario actual (nombre, correo, foto)
  obtenerUsuarioActual() {
    return this.auth.currentUser;
  }
}