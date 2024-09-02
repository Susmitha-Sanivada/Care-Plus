import { createFeatureSelector } from '@ngrx/store';
import { allTestsState } from '../reducers/tests.reducer';

export const selectTests = createFeatureSelector<allTestsState>('tests');
export const selectSearchedTests =
  createFeatureSelector<allTestsState>('searchTests');
