import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, EmailValidator} from '@angular/forms';
import { User, Token, UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public invalidEmailPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) { 
    this.invalidEmailPassword = true;
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        
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
      
      this._userService.login(user).subscribe(
        () => {
          this.router.navigateByUrl('probe');
        }, (err) => {
          if (err.status == '401') {
            this.formLogin.controls['email'].setErrors({'invalid': true});
          } else {
            console.error(err);
          }
        }
      );
    }
  }
}