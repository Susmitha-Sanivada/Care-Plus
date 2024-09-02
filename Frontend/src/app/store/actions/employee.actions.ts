import { createAction, props } from '@ngrx/store';
import { Employee } from '../../model';

export const loadEmployeeData = createAction(
  '[Login Component] employee',
  props<{ params: any }>()
);
export const loadEmployeeDataSuccess = createAction(
  '[Login Component] employeeSucces',
  props<{ payload: Employee }>()
);
export const loadEmployeeDataFail = createAction(
  '[Login Component] employeeFail',
  props<{ payload: string }>()
);
export const loadEmployeeDataClear = createAction(
  '[Employee Component] employeeClear'
);
