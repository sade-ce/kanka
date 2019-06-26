import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatSnackBar, MatDialog} from '@angular/material';
import {merge, of as observableOf, Subject, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { environment as env } from '@env/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from '@app/shared/components/confirm/confirm.component';
@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.css']
})
export class ListCountryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];

  data: any[] = [];

  searchForm: FormGroup;
  load$ = new Subject<string | null>();

  resultsLength = 0;
  loading = true;

  preloading = false;

  subscription: Subscription;

  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
    ) {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.subscription = merge(this.sort.sortChange, this.paginator.page, this.load$)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.loading = true;

            if (!this.preloading) {
              this.preloading = true;
              return this.activatedRoute.data.pipe(
                map((resolve: any) => resolve.data)
              );

            } else {
              const params = new HttpParams()
              .set('filter.searchString', this.searchForm.value.name || '')
              .set('paginator.offset', (this.paginator.pageIndex * this.paginator.pageSize).toString())
              .set('paginator.limit', this.paginator.pageSize.toString())
              .set('orderBy.by', this.sort.active)
              .set('orderBy.desc', (this.sort.direction === 'desc').toString());

              return this.httpClient.get<any>(`${env.serverUrl}/countries`, {params});
            }
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.loading = false;
            this.resultsLength = data.countItems;

            return data.value;
          }),
          catchError(() => {
            this.loading = false;
            return observableOf([]);
          })
        ).subscribe((data: any) => {
            this.data = data;
        }, (error: HttpErrorResponse) => {
          this.snackBar.open(error.error, 'X', {duration: 3000});
        });
  }

  onFilter(): void {
    if (this.searchForm.valid) {
      this.load$.next(this.searchForm.value.name);
      this.searchForm.disable();
    }
  }

  onClear(): void {
    this.searchForm.reset();
    this.searchForm.enable();
    this.load$.next('');
  }

  onDelete(item: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `"${
          item.name
        }" silinecektir. Onaylıyormusunuz?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.httpClient.delete(`${env.serverUrl}/countries/${item.id}`).subscribe(data => {

          this.load$.next('');

        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
