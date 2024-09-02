import { createReducer } from '@ngrx/store';
import { Tests } from '../../model';
import {
  loadSearchedTest,
  loadSearchedTestFail,
  loadTestData,
  loadTestDataFail,
  loadTestDataSuccess,
} from '../actions/tests.actions';
import { on } from '@ngrx/store';

export interface allTestsState {
  data: Tests[] | null;
  total: number;
  loading: boolean;
  error: string | null;
}

export const allTestsInitialState = {
  data: [] as Tests[] | null,
  total: 0 as number,
  loading: false,
  error: '' as string | null,
};
export const allTestsReducer = createReducer(
  allTestsInitialState,
  on(loadTestData, (state) => {
    return { data: null, total: 0, loading: true, error: null };
  }),
  on(loadTestDataSuccess, (state, { payload, total }) => {
    return { data: payload, total: total, loading: false, error: null };
  }),
  on(loadTestDataFail, (state, { payload }) => {
    return { data: null, total: 0, loading: false, error: payload };
  })
);
export const searchTestsReducer = createReducer(
  allTestsInitialState,
  on(loadSearchedTest, (state) => {
    return { data: null, total: 0, loading: true, error: null };
  }),
  on(loadTestDataSuccess, (state, { payload, total }) => {
    return { data: payload, total: total, loading: false, error: null };
  }),
  on(loadSearchedTestFail, (state, { payload }) => {
    return { data: null, total: 0, loading: false, error: payload };
  })
);
