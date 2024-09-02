import { createFeatureSelector } from '@ngrx/store';
import { allRecordsState } from '../reducers/all_records.reducer';

export const searchRecordSelector =
  createFeatureSelector<allRecordsState>('searchRecord');
