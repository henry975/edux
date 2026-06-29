import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.page.html',
  styleUrls: ['./saludo.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SaludoPage implements OnInit {
  private enrutador = inject(Router);

  ngOnInit() {
    // Temporizador de 10 segundos exactos (10000 milisegundos)
    setTimeout(() => {
      this.enrutador.navigate(['/bienvenida']);
    }, 10000);
  }
}