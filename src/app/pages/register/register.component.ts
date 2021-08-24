import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CatalogueModel, DeliveryModel, UserModel} from '../../models';
import {UserAdministrationHttpService} from '../../services/user-administration-http.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() user: UserModel = {};
  @Output() userNewOrUpdate = new EventEmitter<UserModel>();

  registerUser: boolean = true;
  delivery: DeliveryModel = {};
  user_id: number = 0;
  formRegister: FormGroup;
  automaticPassword: FormControl;
  progressBar: boolean = false;
  identificationTypes: CatalogueModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private userAdministrationHttpService: UserAdministrationHttpService,
              public messageService: MessageService,
              ) {
    this.formRegister = this.newFormRegister();
    this.automaticPassword = this.formBuilder.control(false);
  }

  ngOnInit(): void {
    this.formRegister.patchValue(this.user);
  }

  newFormRegister() {
    return this.formBuilder.group({
      id: [null],
      identificationType: [null, [Validators.required]],
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordChange: [true],
    });
  }


  onSubmit() {
    if (this.formRegister.valid) {
      if (this.idField.value) {
        this.updateUser(this.formRegister.value);
      } else {
        this.storeUser(this.formRegister.value);
      }
    } else {
      this.formRegister.markAllAsTouched();
    }
  }

  storeUser(user: UserModel): void {
    this.progressBar = true;
    this.userAdministrationHttpService.storeUser(user).subscribe(
      response => {
        this.messageService.success(response);
        this.formRegister.reset();
        this.userNewOrUpdate.emit(user);
        this.user_id = response.data.id;
        this.progressBar = false;
        this.registerUser = false
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
        this.formRegister.reset();
        this.userNewOrUpdate.emit(user);
        this.progressBar = false;
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }


  get idField() {
    return this.formRegister.controls['id'];
  }

  get identificationTypeField() {
    return this.formRegister.controls['identificationType'];
  }

  get usernameField() {
    return this.formRegister.controls['username'];
  }

  get nameField() {
    return this.formRegister.controls['name'];
  }

  get lastnameField() {
    return this.formRegister.controls['lastname'];
  }

  get emailField() {
    return this.formRegister.controls['email'];
  }

  get passwordField() {
    return this.formRegister.controls['password'];
  }

}
