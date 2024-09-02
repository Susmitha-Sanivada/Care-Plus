import { createReducer } from '@ngrx/store';
import { allRecordsinitialState } from './all_records.reducer';
import {
  searchRecord,
  searchRecordFail,
  searchRecordSuccess,
} from '../actions/search_record.action';
import { on } from '@ngrx/store';

export const searchRecordsReducer = createReducer(
  allRecordsinitialState,
  on(searchRecord, (state, { payload }) => {
    return { data: null, total: 0, loading: true, error: null };
  }),
  on(searchRecordSuccess, (state, { payload, total }) => {
    return {
      data: payload,
      total: total,
      loading: false,
      error: null,
    };
  }),
  on(searchRecordFail, (state, { payload }) => {
    return {
      data: null,
      total: 0,
      loading: false,
      error: payload,
    };
  })
);
