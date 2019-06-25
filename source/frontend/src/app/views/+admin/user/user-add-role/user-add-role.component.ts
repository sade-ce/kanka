import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';
@Component({
  selector: 'app-user-add-role',
  templateUrl: './user-add-role.component.html',
  styleUrls: ['./user-add-role.component.css']
})
export class UserAddRoleComponent implements OnInit {

  selectForm: FormGroup;
  loading = false;

  roles: Observable<any[]>;

  itemId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.selectForm = this.formBuilder.group({
      roles: ['', Validators.required]
    });

    this.roles = this.httpClient.get<any>(`${env.serverUrl}/Role/List`).pipe(
      map(data => {
        return data.value;
      })
    );


    // todo incele
    // tslint:disable-next-line:no-string-literal
    this.itemId = this.activatedRoute.snapshot.params['id'];

    this.httpClient.get<any>(`${env.serverUrl}/User/GetRolesByUser?id=${this.itemId}`).subscribe((data: any) => {
      if (data) {
        this.selectForm.patchValue({
          roles: data
        });
      }
    });
  }

  onRoleAdd(): void {
    this.loading = true;

    if (this.selectForm.valid) {
      this.selectForm.disable();

      this.httpClient.post(`${env.serverUrl}/User/AddRole`,
                {userId: this.itemId, roles: this.selectForm.value.roles}).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Yeni rol seçim`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'user']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.selectForm.enable();
        this.snackBar.open(error.error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
