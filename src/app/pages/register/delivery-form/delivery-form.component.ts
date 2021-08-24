import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DeliveryModel } from '../../../models/delivery.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryAdministrationHttpService } from '../../../services/delivery-administration.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  @Input() user_id: number = 0;
  @Output() deliveryNewOrUpdate = new EventEmitter<DeliveryModel>();

  formDelivery: FormGroup;
  progressBar: boolean = false;
  vehicleTypes: string []=['moto','automovil'];

  constructor(private formBuilder: FormBuilder,
              private deliveryAdministrationHttpService: DeliveryAdministrationHttpService,
              public messageService: MessageService,
              private router: Router,) { 
          this.formDelivery = this.newFormDelivery();
      }

  ngOnInit(): void {}

  newFormDelivery = () =>{
    return this.formBuilder.group({
      user_id: [null],
      id: [null],
      calification: [null, [Validators.required]],
      description: [null, [Validators.required]],
      placa: [null, [Validators.required]],
      vehicle: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.formDelivery.valid) {
        this.formDelivery.value.user_id = this.user_id;
        this.storeDelivery(this.formDelivery.value);
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
        this.router.navigate(['/authentication/login']);
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

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
