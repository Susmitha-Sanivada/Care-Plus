import { createReducer } from '@ngrx/store';
import { AllRecords, CreateRecord } from '../../model';
import {
  createRecord,
  createRecordFail,
  createRecordSuccess,
  updateRecord,
  updateRecordFail,
  updateRecordSuccess,
} from '../actions/create_records.action';
import { on } from '@ngrx/store';
import { state } from '@angular/animations';
export interface createRecordState {
  data: AllRecords | null;
  loading: boolean;
  error: string | null;
}
export const createRecordinitialState = {
  data: [] as [] | AllRecords | null,
  loading: false,
  error: '' as string | null,
};
export const createRecordReducer = createReducer(
  createRecordinitialState,
  on(createRecord, () => {
    return {
      data: null,
      loading: true,
      error: null,
    };
  }),
  on(createRecordSuccess, (state, { payload }) => {
    return {
      data: payload,
      loading: false,
      error: null,
    };
  }),
  on(createRecordFail, (state, { payload }) => {
    return {
      data: null,
      loading: false,
      error: payload,
    };
  })
);

export const updateRecordReducer = createReducer(
  createRecordinitialState,
  on(updateRecord, () => {
    return {
      data: null,
      loading: true,
      error: null,
    };
  }),
  on(updateRecordSuccess, () => {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }),
  on(updateRecordFail, (_, { payload }) => {
    return {
      data: null,
      loading: false,
      error: payload,
    };
  })
);
