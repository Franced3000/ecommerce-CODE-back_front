import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.name && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this.loading = true;
        this._auth
          .register({
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .subscribe(
            (res) => {
              console.log(res);
              this.loading = false;
              this._router.navigate(['/login']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    return this.name && this.email && this.password && this.confirmPassword
      ? true
      : false;
  }
}
