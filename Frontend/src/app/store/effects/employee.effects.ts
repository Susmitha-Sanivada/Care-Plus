import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadEmployeeData,
  loadEmployeeDataClear,
  loadEmployeeDataFail,
  loadEmployeeDataSuccess,
} from '../actions/employee.actions';
import {
  catchError,
  delay,
  exhaustMap,
  mergeMap,
  switchAll,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import { of, tap } from 'rxjs';
import {
  AllRecords,
  AllRecordsResult,
  CreateRecord,
  Result,
  ResultData,
  TestsDataResult,
  createdRecordData,
  updatedRecord,
} from '../../model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers/employee.reducer';
import {
  loadAllRecordsData,
  loadAllRecordsDataSuccess,
} from '../actions/all_records.actions';
import {
  loadSearchedTest,
  loadSearchedTestFail,
  loadSearchedTestSuccess,
  loadTestData,
  loadTestDataFail,
  loadTestDataSuccess,
} from '../actions/tests.actions';
import {
  createRecord,
  createRecordFail,
  createRecordSuccess,
  updateRecord,
  updateRecordFail,
  updateRecordSuccess,
} from '../actions/create_records.action';
import {
  searchRecord,
  searchRecordFail,
  searchRecordSuccess,
} from '../actions/search_record.action';
import { allTestsState } from '../reducers/tests.reducer';
import { create } from 'domain';

@Injectable()
export class EmployeeEffects {
  loadEmployeeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployeeData),
      mergeMap(({ params }) =>
        this.http
          .get<Result>('http://localhost:3000/v1/employees', { params })
          .pipe(
            map((data) => {
              if (
                params.Username &&
                data.result.data[0]?.Username === params.Username
              ) {
                this.router.navigate(['home/employee']);
                return loadEmployeeDataSuccess({
                  payload: data.result.data[0],
                });
              } else {
                setTimeout(() => {
                  this.router.navigate(['home']);
                  this.store.dispatch(loadEmployeeDataClear());
                }, 3000);
                return loadEmployeeDataFail({ payload: 'fail' });
              }
            })
          )
      )
    )
  );
  loadRecentRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllRecordsData),
      switchMap(({ page }) =>
        this.http
          .get<AllRecordsResult>(
            'http://localhost:3000/v1/records?sort=Registered_Date',
            { params: { page } }
          )
          .pipe(
            map((data) => {
              if (data.result.results > 0) {
                return loadAllRecordsDataSuccess({
                  payload: data.result.data,
                  total: data.total,
                });
              } else {
                return loadEmployeeDataFail({ payload: 'fail' });
              }
            })
          )
      )
    )
  );
  searchRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchRecord),
      switchMap(({ payload }) =>
        this.http
          .get<AllRecordsResult>(`http://localhost:3000/v1/records/${payload}`)
          .pipe(
            map((data) => {
              if (data.result.results > 0) {
                return searchRecordSuccess({
                  payload: data.result.data,
                  total: data.result.data.length,
                });
              } else {
                return searchRecordFail({ payload: 'fail' });
              }
            })
          )
      )
    )
  );
  searchTests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchedTest),
      exhaustMap(({ payload }) =>
        this.http
          .get<TestsDataResult>(`http://localhost:3000/v1/tests/${payload}`)
          .pipe(
            map((data) => {
              if (data.result.results > 0) {
                return loadTestDataSuccess({
                  payload: data.result.data,
                  total: data.result.results,
                });
              } else {
                return loadSearchedTestFail({ payload: 'fail' });
              }
            })
          )
      )
    )
  );
  loadTestData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTestData),
      switchMap(() =>
        this.http.get<TestsDataResult>('http://localhost:3000/v1/tests/').pipe(
          map((data) => {
            if (data.status === 'success') {
              return loadTestDataSuccess({
                payload: data.result.data,
                total: data.result.results,
              });
            } else {
              return loadTestDataFail({ payload: 'fail' });
            }
          })
        )
      )
    )
  );
  createRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRecord),
      exhaustMap((action) => {
        return this.http
          .post<createdRecordData>(
            'http://localhost:3000/v1/records/',
            JSON.stringify(action.payload),
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((data) => {
              if (data.status === 'success') {
                return createRecordSuccess({ payload: data.result });
              } else {
                return createRecordFail({ payload: 'fail' });
              }
            })
          );
      })
    )
  );
  updateRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRecord),
      exhaustMap((action) => {
        return this.http
          .patch<updatedRecord>(
            `http://localhost:3000/v1/records/${action._id}`,
            action.Body,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((data) => {
              if (
                data.status === 'success' &&
                data.result.modifiedCount === 1
              ) {
                return updateRecordSuccess();
              } else {
                return updateRecordFail({ payload: 'fail' });
              }
            })
          );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<{ employee: State }>
  ) {}
}
