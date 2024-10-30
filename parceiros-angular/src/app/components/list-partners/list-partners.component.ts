import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface Partner {
  id: string;
  name: string;
  description?: string;
  repositoryGit?: string;
  urlDoc?: string;
  clients?: string;
  projects?: string;
}

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['./list-partners.component.css']
})
export class ListPartnersComponent implements OnInit {
  partners: Partner[] = [];
  paginatedPartners: Partner[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      this.currentPage = page ? page - 1 : 0;
      this.fetchPartners();
    });
  }

  fetchPartners(): void {
    this.http.get<Partner[]>('https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners')
      .subscribe(data => {
        this.partners = data;
        this.updatePaginatedPartners();
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePaginatedPartners();
    this.updateUrlWithPage();
  }

  updatePaginatedPartners(): void {
    const start = this.currentPage * this.pageSize;
    this.paginatedPartners = this.partners.slice(start, start + this.pageSize);
  }

  updateUrlWithPage(): void {
    this.router.navigate([], {
      queryParams: { page: this.currentPage + 1 },
      queryParamsHandling: 'merge',
    });
  }

  addPartner(): void {
    this.router.navigate(['/register']);
  }

  editPartner(id: string): void {
    this.router.navigate([`/register/${id}`]);
  }

  deletePartner(id: string): void {
    if (confirm('Tem certeza de que deseja excluir este parceiro?')) {
      this.http.delete(`https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners/${id}`)
        .subscribe(() => {
          console.log('Parceiro excluído com sucesso!');
          this.fetchPartners(); // Atualizar a lista de parceiros
        }, error => {
          console.error('Erro ao excluir parceiro:', error);
        });
    }
  }
}
