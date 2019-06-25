import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit {

  editForm: FormGroup;
  loading = false;

  itemId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      repeat_password: ['']
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;
    const params = new HttpParams()
      .set('Id', this.itemId);

    this.httpClient.get(`${env.serverUrl}/User/GetById`, {params}).subscribe((data: any) => {
      this.loading = false;

      this.editForm.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email
      });

    });

  }

  onEdit(): void {
    this.loading = true;

    if (this.editForm.valid) {
      this.editForm.disable();

      const editValues = {
        Id: this.itemId,
        firstname: this.editForm.value.firstname,
        lastname: this.editForm.value.lastname,
        email: this.editForm.value.email,
        password: this.editForm.value.password
      };

      this.httpClient.patch(`${env.serverUrl}/User/Update`, editValues).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`User con İsim ${this.editForm.value.firstname} düzenlendi`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'user']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.editForm.enable();
        this.snackBar.open(error.error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
