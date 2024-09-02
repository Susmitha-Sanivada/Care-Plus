import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { employeeReducer } from './reducers/employee.reducer';
import { allRecordsReducer } from './reducers/all_records.reducer';
import { allTestsReducer, searchTestsReducer } from './reducers/tests.reducer';
import {
  createRecordReducer,
  updateRecordReducer,
} from './reducers/create_record.reducer';
import { searchRecordSelector } from './selectors/search_record.selector';
import { searchRecordsReducer } from './reducers/search_records.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  employee: employeeReducer,
  allRecords: allRecordsReducer,
  tests: allTestsReducer,
  createRecord: createRecordReducer,
  searchRecord: searchRecordsReducer,
  searchTests: searchTestsReducer,
  updateRecord: updateRecordReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
