import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partner {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

  constructor(private http: HttpClient) { }

  // Listar todos os parceiros
  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl);
  }

  // Listar parceiro por ID
  getPartnerById(id: string): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`);
  }

  // Cadastrar um parceiro
  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.apiUrl, partner);
  }

  // Atualizar um parceiro
  updatePartner(id: string, partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`${this.apiUrl}/${id}`, partner);
  }

  // Deletar um parceiro
  deletePartner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
