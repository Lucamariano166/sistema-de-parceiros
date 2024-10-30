import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface Partner {
  id: string;
  name: string;
  description: string;
  repositoryGit?: string;
  urlDoc?: string;
  clients?: string;
  projects?: string;
}

@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.css']
})
export class RegisterPartnerComponent implements OnInit {
  partner: Partner = {
    id: '',
    name: '',
    description: ''
  };
  isEditMode: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.http.get<Partner>(`https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners/${id}`)
        .subscribe(data => {
          this.partner = data;
        });
    }
  }

  isValidUrl(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }

  isNumber(value: string): boolean {
    return /^\d+$/.test(value);
  }

  validatePartner(): boolean {
    this.errorMessage = '';

    if (this.partner.repositoryGit && !this.isValidUrl(this.partner.repositoryGit)) {
      this.errorMessage = 'O campo "Repositório Git" deve conter uma URL válida.';
      return false;
    }
    if (this.partner.urlDoc && !this.isValidUrl(this.partner.urlDoc)) {
      this.errorMessage = 'O campo "URL do Documento" deve conter uma URL válida.';
      return false;
    }

    return true;
  }

  registerPartner(): void {
    if (!this.validatePartner()) {
      console.error(this.errorMessage);
      return;
    }

    if (this.isEditMode) {
      // Atualizar parceiro existente
      this.http.put(`https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners/${this.partner.id}`, this.partner)
        .subscribe({
          next: () => {
            console.log('Parceiro atualizado com sucesso!');
            this.router.navigate(['/partners']);
          },
          error: (err) => {
            console.error('Erro ao atualizar parceiro:', err);
          }
        });
    } else {
      // Cadastrar novo parceiro
      this.http.post('https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners', this.partner)
        .subscribe({
          next: () => {
            console.log('Parceiro cadastrado com sucesso!');
            this.router.navigate(['/partners']);
          },
          error: (err) => {
            console.error('Erro ao cadastrar parceiro:', err);
          }
        });
    }
  }
}
