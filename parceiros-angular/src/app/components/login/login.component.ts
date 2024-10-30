import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) { }

  onLogin() {
    // Simulando login
    if (this.username) {
      if (this.rememberMe) {
        document.cookie = `username=${this.username}; path=/; max-age=31536000`; // 1 ano
      } else {
        localStorage.setItem('username', this.username);
      }
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    document.body.classList.add('hide-navbar');
    // Verificar se o cookie ou local storage possui o nome do usuário
    const cookieUsername = this.getCookie('username');
    if (cookieUsername) {
      this.username = cookieUsername;
    } else {
      this.username = localStorage.getItem('username') || '';
    }
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift(); // Adicione o operador de encadeamento opcional (?.)
      return cookieValue || null; // Retorne null se cookieValue for undefined
    }
    return null;
  }

}
