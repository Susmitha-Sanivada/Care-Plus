import { createFeatureSelector } from '@ngrx/store';
import { allRecordsState } from '../reducers/all_records.reducer';

export const allRecordsSelector =
  createFeatureSelector<allRecordsState>('allRecords');
