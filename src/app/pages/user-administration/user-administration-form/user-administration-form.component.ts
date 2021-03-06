import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CatalogueModel, UserModel} from '../../../models';
import {UserAdministrationHttpService} from '../../../services/user-administration-http.service';
import {MessageService} from '../../../services/message.service';
import {MenuItem} from 'primeng/api';
import {PhoneModel} from '../../../models/phone.model';

@Component({
  selector: 'app-user-administration-form',
  templateUrl: './user-administration-form.component.html',
  styleUrls: ['./user-administration-form.component.scss']
})
export class UserAdministrationFormComponent implements OnInit {
  @Input() user: UserModel = {};
  @Output() userNewOrUpdate = new EventEmitter<UserModel>();

  formUser: FormGroup;
  automaticPassword: FormControl;
  progressBar: boolean = false;
  identificationTypes: CatalogueModel[] = [];
  phoneOperators: CatalogueModel[] = [];
  phoneTypes: CatalogueModel[] = [];
  phoneLocations: CatalogueModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private userAdministrationHttpService: UserAdministrationHttpService,
              public messageService: MessageService) {
    this.formUser = this.newFormUser();
    this.automaticPassword = this.formBuilder.control(false);
  }

  ngOnInit(): void {
    this.formUser.patchValue(this.user);
    if (this.user.phones?.length) {
      this.phonesField.clear();
    }
    this.user?.phones?.forEach(phone => {
      this.addPhone(phone);
    });

    if (this.idField.value) {
      this.passwordField.clearValidators();
    }
    this.getIdentificationTypes();
    this.getPhoneOperators();
    this.getPhoneTypes();
    this.getPhoneLocations();
  }

  newFormUser() {
    return this.formBuilder.group({
      id: [null],
      identificationType: [null, [Validators.required]],
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordChange: [true],
      phones: this.formBuilder.array([this.newFormPhone()]),
    });
  }

  newFormPhone() {
    return this.formBuilder.group({
      id: [null],
      operator: [null, [Validators.required]],
      type: [null, [Validators.required]],
      location: [null, [Validators.required]],
      number: [null, [Validators.required]],
      main: [false],
    });
  }

  getIdentificationTypes() {
    this.userAdministrationHttpService.getCatalogues('IDENTIFICATION_TYPE').subscribe(
      response => {
        this.identificationTypes = response.data;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  getPhoneOperators() {
    this.userAdministrationHttpService.getCatalogues('PHONE_OPERATOR').subscribe(
      response => {
        this.phoneOperators = response.data;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  getPhoneTypes() {
    this.userAdministrationHttpService.getCatalogues('PHONE_TYPE').subscribe(
      response => {
        this.phoneTypes = response.data;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  getPhoneLocations() {
    this.userAdministrationHttpService.getLocations('COUNTRY').subscribe(
      response => {
        this.phoneLocations = response.data;
      }, error => {
        this.messageService.error(error);
      }
    );
  }

  onSubmit() {
    console.log(this.formUser);
    if (this.formUser.valid) {
      if (this.idField.value) {
        this.updateUser(this.formUser.value);
      } else {
        this.storeUser(this.formUser.value);
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  storeUser(user: UserModel): void {

    this.progressBar = true;
    this.userAdministrationHttpService.storeUser(user).subscribe(
      response => {
        this.messageService.success(response);
        this.formUser.reset();
        this.userNewOrUpdate.emit(user);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  updateUser(user: UserModel): void {
    this.progressBar = true;
    this.userAdministrationHttpService.updateUser(user.id, user).subscribe(
      response => {
        this.messageService.success(response);
        this.formUser.reset();
        this.userNewOrUpdate.emit(user);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  generateAutomaticPassword(event: any) {
    this.automaticPassword.setValue(event.checked);
    if (event.checked) {
      this.passwordField.setValue(Math.random().toString(36).slice(-8));
    }
  }

  addPhone(data: PhoneModel = {}) {
    const formPhone = this.newFormPhone();
    formPhone.patchValue(data);
    this.phonesField.push(formPhone);
  }

  removePhone(index: number = -1) {
    this.phonesField.removeAt(index);
  }

  get idField() {
    return this.formUser.controls['id'];
  }

  get identificationTypeField() {
    return this.formUser.controls['identificationType'];
  }

  get usernameField() {
    return this.formUser.controls['username'];
  }

  get nameField() {
    return this.formUser.controls['name'];
  }

  get lastnameField() {
    return this.formUser.controls['lastname'];
  }

  get emailField() {
    return this.formUser.controls['email'];
  }

  get passwordField() {
    return this.formUser.controls['password'];
  }

  get passwordChangeField() {
    return this.formUser.controls['passwordChange'];
  }

  get phonesField() {
    return this.formUser.controls['phones'] as FormArray;
  }
}
