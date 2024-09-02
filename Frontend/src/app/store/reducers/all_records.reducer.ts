import { createReducer } from '@ngrx/store';
import { AllRecords } from '../../model';
import { on } from '@ngrx/store';
import {
  loadAllRecordsData,
  loadAllRecordsDataFail,
  loadAllRecordsDataSuccess,
} from '../actions/all_records.actions';

export interface allRecordsState {
  data: AllRecords[] | null;
  total: number;
  loading: boolean;
  error: string | null;
}
export const allRecordsinitialState = {
  data: [] as AllRecords[] | null,
  total: 0 as number,
  loading: false,
  error: '' as string | null,
};

export const allRecordsReducer = createReducer(
  allRecordsinitialState,
  on(loadAllRecordsData, (state, { page }) => {
    return { data: null, total: 0, loading: true, error: null };
  }),
  on(loadAllRecordsDataSuccess, (state, { payload, total }) => {
    return {
      data: payload,
      total: total,
      loading: false,
      error: null,
    };
  }),
  on(loadAllRecordsDataFail, (state, { payload }) => {
    return {
      data: null,
      total: 0,
      loading: false,
      error: payload,
    };
  })
);
