import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { IApiListService } from '../services/core';
import { IFilter } from '../services/api/core';
import { map } from 'rxjs/operators';


export class ReportEmigrationDataSource<T, TF extends IFilter> implements DataSource<T> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private collectionSubject = new BehaviorSubject<T[]>([]);
    private countSubject = new BehaviorSubject<number>(0);

    constructor(private api: IApiListService<T, TF>) {}

    setData(collection: T[], count: number): void {
      this.collectionSubject.next(collection);
      this.countSubject.next(count);
    }

    load(filter?: TF) {
      this.loadingSubject.next(true);
      this.loadCollection(filter);
    }

    private loadCollection(filter?: TF) {
      this.api.List(filter).pipe(
        map(data => {

          const list = [];

          data.list.map((reservation: any) => {
             reservation.guestReservations.map(guest => {
              list.push({
                guest: guest.guest,
                initDate: reservation.initDate,
                endDate: reservation.endDate,
              });
            });
          });

        // tslint:disable-next-line:align
        return {
          // tslint:disable-next-line:object-literal-shorthand
          list: list,
          cnt: list.length
        };
      })).subscribe(
        (res) => {
          this.collectionSubject.next(res.list);
          this.countSubject.next(res.cnt);
          this.loadingSubject.next(false);
        },
        (e) => {
          this.handleError(e);
        }
      );
    }

    private handleError(e: any): void {
      this.countSubject.next(0);
      this.collectionSubject.next([]);
      this.loadingSubject.next(false);
    }

    count(): Observable<number> {
      return this.countSubject.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
      return this.collectionSubject.asObservable();
    }

    connectCount(): Observable<number> {
      return this.countSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.collectionSubject.complete();
        this.countSubject.complete();
        this.loadingSubject.complete();
    }
}
