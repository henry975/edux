import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importamos el módulo completo
import { RouterModule } from '@angular/router'; // Necesario para los botones que navegan

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  // Aquí usamos IonicModule en lugar de IonContent, IonHeader...
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class BienvenidaPage implements OnInit {
  constructor() { }
  ngOnInit() { }
}