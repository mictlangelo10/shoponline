import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router'; // Importa Router aquí
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.items = [
          {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.setAuthStatus(false); // Desautenticar al usuario
              sessionStorage.removeItem('email');
              this.router.navigate(['/login']);
            },
          },
        ];
      } else {
        this.items = [
          {
            label: 'Ingresar',
            icon: 'pi pi-sign-in',
            command: () => {
              this.router.navigate(['/login']);
            },
          },
          {
            label: 'Registrar',
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate(['/register']);
            },
          },
        ];
      }
    });
  }
}
