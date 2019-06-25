import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.loading = true;

    if (this.loginForm.valid) {
      this.loginForm.disable();

      this.httpClient.post(`${env.serverUrl}/Account/SignIn`, {email: this.loginForm.value.email, password: this.loginForm.value.pass})
        .subscribe((data: any) => {

          if (data) {
            this.authService.login(data);
            this.loading = false;
            this.snackBar.open(`Hoşgeldin ${this.authService.getUsername()}`, 'X', {duration: 3000});
            this.router.navigate(['dashboard']);
          }
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.loginForm.enable();
          console.log(error);
          this.snackBar.open(error.error, 'X', {duration: 3000});
        });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}
