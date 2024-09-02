import { createReducer, on } from '@ngrx/store';
import {
  loadEmployeeData,
  loadEmployeeDataClear,
  loadEmployeeDataFail,
  loadEmployeeDataSuccess,
} from '../actions/employee.actions';
import { Employee } from '../../model';
export interface State {
  employee: Employee | null;
  loading: boolean;
  error: any;
}
const initialState: State = {
  employee: null,
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployeeData, (state) => {
    return {
      employee: null,
      error: null,
      loading: true,
    };
  }),
  on(loadEmployeeDataSuccess, (state, { payload }) => {
    return { employee: payload, error: null, loading: false };
  }),
  on(loadEmployeeDataFail, (state, { payload }) => {
    return { employee: null, error: payload, loading: false };
  }),
  on(loadEmployeeDataClear, (state) => {
    return initialState;
  })
);
