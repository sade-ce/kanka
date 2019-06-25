import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {environment as env} from '@env/environment';
import { User } from '@app/core/models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {

  loading = false;
  userProfile: User;

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/Account/Profile`).subscribe((data: any) => {
      this.loading = false;
      if (data) {
        this.userProfile = data;
      }

    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.error, 'X', {duration: 3000});
    });

  }

}
