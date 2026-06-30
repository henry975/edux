import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  sendEmailVerification,
  user,
  deleteUser // Importación necesaria para remover el usuario
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  public usuario$ = user(this.auth);

  constructor() { }

  async registrarConCorreo(correo: string, contrasena: string) {
    const credenciales = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
    await sendEmailVerification(credenciales.user);
    return credenciales;
  }

  async ingresarConCorreo(correo: string, contrasena: string) {
    return await signInWithEmailAndPassword(this.auth, correo, contrasena);
  }

  async ingresarConGoogle() {
    const proveedorGoogle = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, proveedorGoogle);
  }

  async cerrarSesion() {
    return await signOut(this.auth);
  }

  obtenerUsuarioActual() {
    return this.auth.currentUser;
  }

  // 6. Eliminar de forma definitiva al usuario actual de Firebase
  async eliminarCuenta() {
    const usuarioActual = this.auth.currentUser;
    if (usuarioActual) {
      await deleteUser(usuarioActual);
    }
  }
}