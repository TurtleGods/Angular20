import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      email: new FormControl("just@mail.com",[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      displayName: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('',Validators.required),
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
