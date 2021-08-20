import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DeliveryModel } from '../../../models/delivery.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryAdministrationHttpService } from '../../../services/delivery-administration.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-delivery-administration-form',
  templateUrl: './delivery-administration-form.component.html',
  styleUrls: ['./delivery-administration-form.component.css']
})
export class DeliveryAdministrationFormComponent implements OnInit {

  @Output() deliveryNewOrUpdate = new EventEmitter<DeliveryModel>();
  @Input() delivery: DeliveryModel = {};
  formDelivery: FormGroup;
  progressBar: boolean = false;
  vehicleTypes: string []=['moto','automovil'];

  constructor(private formBuilder: FormBuilder,
              private deliveryAdministrationHttpService: DeliveryAdministrationHttpService,
              public messageService: MessageService) { 
          this.formDelivery = this.newFormDelivery();

      }

  ngOnInit(): void {
    this.formDelivery.patchValue(this.delivery);
    
    console.log(this.delivery)
  }
    newFormDelivery = () =>{
    return this.formBuilder.group({
      id: [null],
      calification: [null, [Validators.required]],
      description: [null, [Validators.required]],
      placa: [null, [Validators.required]],
      vehicle: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log(this.formDelivery);
    if (this.formDelivery.valid) {
      if (this.idField.value) {
        this.updateDelivery(this.formDelivery.value);
      } else {
        this.storeDelivery(this.formDelivery.value);
      }
    } else {
      this.formDelivery.markAllAsTouched();
    }
  }
  storeDelivery(delivery: DeliveryModel): void {
    this.progressBar = true;
    this.deliveryAdministrationHttpService.storeDelivery(delivery).subscribe(
      response => {
        this.messageService.success(response);
        this.formDelivery.reset();
        this.deliveryNewOrUpdate.emit(delivery);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }


  updateDelivery(delivery: DeliveryModel): void {
    this.progressBar = true;
    this.deliveryAdministrationHttpService.updateDelivery(delivery.id, delivery).subscribe(
      response => {
        this.messageService.success(response);
        this.formDelivery.reset();
        this.deliveryNewOrUpdate.emit(delivery);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );  }
  get idField(){
    return this.formDelivery.controls['id'];
  }
  get calificationField(){
    return this.formDelivery.controls['calification'];
  }
  get descriptionField(){
    return this.formDelivery.controls['description'];
  }
  get placaField(){
    return this.formDelivery.controls['placa'];
  }
  get vehicleField(){
    return this.formDelivery.controls['vehicle'];
  }

}
