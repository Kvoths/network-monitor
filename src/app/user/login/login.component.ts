import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, EmailValidator} from '@angular/forms';
import { User, Token, UserService } from '../../services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email () {
    return this.formLogin.get('email');
  }

  get password () {
    return this.formLogin.get('password');
  }

  sendLogin () {
    if (this.formLogin.valid) {
      let user: User;

      user = {
        mail: this.email.value,
        password: this.password.value
      };
      this._userService.login(user);
    }
  }
}