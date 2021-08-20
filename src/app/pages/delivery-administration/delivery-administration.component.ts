import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DeliveryModel } from '../../models/delivery.model';
import { DeliveryAdministrationHttpService } from '../../services/delivery-administration.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-delivery-administration',
  templateUrl: './delivery-administration.component.html',
  styleUrls: ['./delivery-administration.component.css']
})
export class DeliveryAdministrationComponent implements OnInit {

  deliveries : DeliveryModel []= [];
  cols: any[];
  items: MenuItem[] = [];
  loading: boolean;
  selectedDelivery: DeliveryModel = {};
  selectedDeliveries: DeliveryModel[] = [];
  dialogForm: boolean = false;

  constructor(private  deliveryAdministrationService: DeliveryAdministrationHttpService,
              private messageService: MessageService, private router: Router
    ) { 
      this.loading = true;
      this.cols = [
        {field: 'calification', header: 'Calificación del conductor'},
        {field: 'description', header: 'Descripción'},
        {field: 'placa', header: 'Placa del vehículo'},
        {field: 'vehicle', header: 'Vehículo'}
      ];
      this.items = [
        {
          label: 'Eliminar Repartidor', icon: 'pi pi-trash', command: () => {
            this.deleteDelivery(this.selectedDelivery);
          }
        }
      ];
    }

  ngOnInit(): void {
    this.getDeliveries();
  }

  getDeliveries(){
    this.loading=true;
    this.deliveryAdministrationService.getDeliveries().subscribe(
      response => {
        this.deliveries =response.data
        this.loading=false;
      },
      error=>{
        this.messageService.error(error);
      }
    )
  }
  
  selectDelivery(delivery: DeliveryModel) {
    this.selectedDelivery = delivery;
  }

  deleteDelivery(delivery: DeliveryModel): void {
    this.messageService.questionDelete({})
    .then((result) => {
      if (result.isConfirmed) {
        this.deliveryAdministrationService.deleteDelivery(delivery.id).subscribe(
          response => {
            this.removeDelivery(delivery);
            this.messageService.success(response);
          },
          error => {
            this.messageService.error(error);
          }
        );
      }
    });
  }

  deleteDeliveries(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedDeliveries.map(element => element.id);
          this.deliveryAdministrationService.deleteDeliveries(ids).subscribe(
            response => {
              this.removeDeliveries(ids);
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  showForm(delivery: DeliveryModel = {}) {
    this.selectedDelivery = delivery;
    this.dialogForm = true;
  }

  saveDelivery(delivery: DeliveryModel) {
    const index = this.deliveries.findIndex(element => element.id === delivery.id);
    if (index === -1) {
      this.deliveries.push(delivery);
    } else {
      this.deliveries[index] = delivery;
    }
    this.dialogForm = false;
  }
  
  removeDelivery(delivery: DeliveryModel) {
    this.deliveries = this.deliveries.filter(element => element.id !== delivery.id);
  }

  removeDeliveries(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.deliveries = this.deliveries.filter(element => element.id !== id);
    }
  }
  toBack(){
    this.router.navigate(['admin/user-administration']);

  }

}