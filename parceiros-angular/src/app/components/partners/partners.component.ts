import { Component, OnInit } from '@angular/core';
import { PartnerService, Partner } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  // styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  selectedPartner: Partner | null = null;

  constructor(private partnerService: PartnerService) { }

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.partnerService.getPartners().subscribe(partners => {
      this.partners = partners;
    });
  }

  // Adicione métodos para cadastrar, atualizar e deletar parceiros
}
