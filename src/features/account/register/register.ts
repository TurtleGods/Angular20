import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/User';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.initializeForm();
  }
  
  register() {
    console.log(this.registerForm.value);
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      displayName: new FormControl(),
      confirmPassword: new FormControl(),
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
