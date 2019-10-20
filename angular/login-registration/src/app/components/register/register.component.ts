import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthStorageService } from '../../services/auth-storage.service';
import { Router } from '@angular/router';
import { RegisterClass } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public register: RegisterClass = {
    name: '',
    password: '',
    mobileNumber: null,
    emailId: ''
  };

  constructor(private _authService: AuthService,
              private _authStorage: AuthStorageService,
              private _router: Router) { }

  ngOnInit() {
  }

  public createUser(formValue) {
    console.log(formValue);
    this._authService.saveUser(formValue).subscribe(res => {
      const { token } = <any>res;
      this._authStorage.saveToken(token);
      this._router.navigate(['/welcome']);
    }, error => {
      console.log(error);
    });
  }

  public getMessage(control: NgModel) {
    const {errors, name} = control;
    if (errors.required) {
      return 'This field is required';
    } else if (errors.pattern) {
      return `Please enter valid ${name}`;
    } else if (errors.minlength) {
      return `Please enter min ${errors.minlength.requiredLength} character`;
    }
  }


}
