import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,

  templateUrl: './nav-menu.component.html',
  styles: ``,
})
export class NavMenuComponent {
  linkItems: { label: string; routerLink: string }[] = [
    {
      label: 'Inicio',
      routerLink: 'home',
    },
    {
      label: 'Estudiantes',
      routerLink: 'students',
    },
    {
      label: 'Cursos',
      routerLink: 'courses',
    },
    {
      label: 'Teachers',
      routerLink: 'teachers',
    },
  ];

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}