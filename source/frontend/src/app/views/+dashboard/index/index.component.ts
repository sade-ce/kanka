import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';
 
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
 
 
  constructor(
    private snackBar: MatSnackBar,
    
  ) {}

  ngOnInit(): void {

   
  }

  ngOnDestroy(): void {

  }

}

