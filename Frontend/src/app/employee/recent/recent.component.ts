import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { allRecordsState } from '../../store/reducers/all_records.reducer';
import { loadAllRecordsData } from '../../store/actions/all_records.actions';
import { Observable } from 'rxjs';

import { allRecordsSelector } from '../../store/selectors/all_records.selector';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllRecords, Employee } from '../../model';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css',
})
export class RecentComponent implements OnInit, OnDestroy {
  allRecordsData$!: Observable<allRecordsState>;
  recordsSubscription!: Subscription;
  page: number = 1;
  pages: number[] = [];
  serialNumbers: number[] = [];
  total_pages: number = 0;

  constructor(
    private store: Store<{ allRecords: allRecordsState }>,
    private router: Router,
    private service: SharedService
  ) {}
  ngOnInit(): void {
    // select the data from store
    this.allRecordsData$ = this.store.select(allRecordsSelector);
    // create a subscription to unsubscribe onDestroy
    this.recordsSubscription = this.allRecordsData$.subscribe((data) => {
      console.log(data);
      // set the default data
      this.setDefault(data);
    });
    // load the first page
    this.store.dispatch(loadAllRecordsData({ page: this.page }));
  }

  onPageClick(page: number) {
    // set the page to the clicked page
    this.page = page;
    // dispatch the load records data by passing the desired page
    this.store.dispatch(loadAllRecordsData({ page: this.page }));
  }
  onClickReload() {
    this.page = 1;
    // set the default data
    this.allRecordsData$.subscribe((data) => {
      this.setDefault(data);
    });
    // load the first page
    this.store.dispatch(loadAllRecordsData({ page: this.page }));
  }
  onclickRecord(data: AllRecords | undefined) {
    if (data) {
      // use the service to set the service observable value to the data
      this.service.setVal(data);
      // navigate to the patient details route
      this.router.navigate(['home/employee/patientDetails']);
      // scroll for a better view
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  setDefault(data: allRecordsState) {
    this.pages = [];
    this.serialNumbers = [];

    // calculate total pages
    this.total_pages = Math.ceil(data.total / 10);
    // create a pages array to use ngfor in template
    for (let i = 0; i < this.total_pages; i++) {
      this.pages.push(i);
    }
    // create serial numbers array to use ngfor in template
    for (let i = this.page * 10 + 1 - 10; i < this.page * 10 + 1; i++) {
      this.serialNumbers.push(i);
    }
  }

  ngOnDestroy(): void {
    // unsubscribe from the subscription
    this.recordsSubscription.unsubscribe();
  }
}
