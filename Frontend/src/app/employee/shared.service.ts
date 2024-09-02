import { importProvidersFrom, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AllRecords } from '../model';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { allRecordsState } from '../store/reducers/all_records.reducer';
import { searchRecordSelector } from '../store/selectors/search_record.selector';
import { searchRecord } from '../store/actions/search_record.action';
import { take, tap, filter } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private store: Store<{ searchRecord: allRecordsState }>,
    private router: Router
  ) {}
  patientDetails = new BehaviorSubject<AllRecords | null>(null);
  patientDetails$ = this.patientDetails.asObservable();

  fetchedData$!: Observable<allRecordsState>;

  setVal(data: AllRecords) {
    this.patientDetails.next(data);
  }
  // setPatientName(name: string) {
  //   this.fetchDataUsingName(name)

  // }
  fetchDataUsingName(name: string) {
    console.log('Dispatching search action...');
    this.store.dispatch(searchRecord({ payload: name }));

    this.fetchedData$ = this.store.select(searchRecordSelector);

    this.fetchedData$
      .pipe(
        tap((data) => console.log('Data received from store:', data)),
        filter((data) => data?.data !== null && data.loading === false), // Filter out unwanted data
        take(1) // Take only the first valid emission
      )
      .subscribe((data) => {
        if (data?.data) {
          this.setVal(data.data[0]);
          this.router.navigate(['home/employee/patientDetails']);
          console.log('Navigating to patient details page:', data.data[0]);
        } else {
          console.warn('No data found');
        }
      });
  }
}
