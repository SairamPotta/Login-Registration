import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage.service';
import { LoginClass } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: LoginClass = {
    emailId: '',
    password: ''
  };

  constructor(private _authService: AuthService,
              private _router: Router,
              private _authStorage: AuthStorageService) { }

  ngOnInit() {
  }

  public validate(formValue) {
    this._authService.validateUser(formValue).subscribe(res => {
      const { token } = <any>res;
      this._authStorage.saveToken(token);
      this._router.navigate(['/welcome']);
    }, err => console.log(err));
  }

  public getMessage(control: NgModel) {
    const {errors, name} = control;
    if (errors.required) {
      return 'This field is required';
    } else {
      if (name === 'emailId' && errors.pattern) {
        return 'Please enter valid emailId';
      }
    }
  }
}
