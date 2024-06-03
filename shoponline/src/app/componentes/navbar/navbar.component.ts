import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router'; // Importa Router aquí

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] | any;

  constructor(private router: Router) {} // Inyecta Router en el constructor

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Ingresar',
            icon: 'pi pi-sign-in',
            command: () => {
              this.router.navigate(['/login']); // Agrega esta línea para redirigir al login
            },
          },
          {
            label: 'Registrar',
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate(['/register']); // Opcional para redirigir al registro
            },
          },
        ],
      },
    ];
  }
}
