import { createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/employee.reducer';

export const selectEmployee = createFeatureSelector<State>('employee');
