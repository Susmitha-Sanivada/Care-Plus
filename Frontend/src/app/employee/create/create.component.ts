import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { allTestsState } from '../../store/reducers/tests.reducer';
import { Store } from '@ngrx/store';
import { selectTests } from '../../store/selectors/tests.selector';
import { loadTestData } from '../../store/actions/tests.actions';
import { createRecordState } from '../../store/reducers/create_record.reducer';
import {
  createRecord,
  updateRecord,
} from '../../store/actions/create_records.action';
import {
  createRecordSelect,
  updateRecordSelect,
} from '../../store/selectors/create_record.selector';
import { TestsSent } from '../../model';
import { loadAllRecordsData } from '../../store/actions/all_records.actions';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit, OnDestroy {
  emptyVal: string = '';
  msg: string | null = null;
  booleanTrue: boolean = true;
  booleanFalse: boolean = false;
  tests: TestsSent[] = [];
  duration: number | any = 0;
  costSum: number | any = 0;
  testsData$!: Observable<allTestsState>;
  createdData$!: Observable<createRecordState>;
  testDataSubscription!: Subscription;
  createdDataSubscription!: Subscription;
  constructor(
    private store: Store<{
      tests: allTestsState;
      createRecord: createRecordState;
    }>
  ) {}
  ngOnInit(): void {
    // select the testdata to render in template to select tests
    this.testsData$ = this.store.select(selectTests);
    this.testDataSubscription = this.testsData$.subscribe((data) => {
      if (data.data?.length === 0 && data.error === '') {
        this.store.dispatch(loadTestData());
      }
    });
  }

  onAdd(myform: NgForm, event: any) {
    this.emptyVal = myform.value.Tests;
    if (
      this.tests.length === 0 ||
      this.tests.find((data) => {
        return data.TestName !== myform.value.Tests;
      })
    ) {
      this.testDataSubscription = this.testsData$.subscribe((data) => {
        // on adding a test push into a temporary object
        this.tests.push({
          TestName: myform.value.Tests,
          Cost: data.data?.[event.target.selectedIndex - 1].Cost,
          Duration: data.data?.[event.target.selectedIndex - 1].Duration,
        });
        // calculate costsum to render in template
        this.costSum += data.data?.[event.target.selectedIndex - 1].Cost;
        // calculate duration to render in template
        if (this.tests.length > 0) {
          this.duration = Math.max(
            ...this.tests.map((data) => {
              return data.Duration;
            })
          );
        }
      });
    }
  }
  onSubmit(myform: NgForm) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // set the form value to the value of temporary tests object
    myform.value.Tests = this.tests;
    // dispatch the action to create record
    this.store.dispatch(createRecord({ payload: myform.value }));
    // reset the values
    myform.resetForm();
    this.tests = [];
    this.emptyVal = '';

    // logic for updating the report status after the duration
    this.createdData$ = this.store.select(createRecordSelect);
    this.createdDataSubscription = this.createdData$.subscribe((data) => {
      if (data?.data) {
        setTimeout(() => {
          this.store.dispatch(
            updateRecord({
              _id: data.data?._id as string,
              Body: {
                Report_Status: true,
              },
            })
          );
          // this.store.dispatch(loadAllRecordsData({ page: 1 }));
        }, (data?.data?.Duration as number) * 60000);
        console.log(data.data, data.data?._id, typeof data.data?._id);
      } else if (data.error) {
        this.msg = 'Something went wrong. Please enter all values';
      } else {
        this.msg = 'Record successfully created';
      }
    });
    setTimeout(() => {
      this.msg = null;
    }, 3000);
    // setting the msg as null to remove the msg in the template
  }
  ngOnDestroy(): void {
    // // unsubscribing from the subscriptions
    this.testDataSubscription.unsubscribe();
    if (this.createdDataSubscription) {
      this.createdDataSubscription.unsubscribe();
    }
  }
}
