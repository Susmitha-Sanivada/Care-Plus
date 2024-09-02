import { createFeatureSelector } from '@ngrx/store';
import { createRecordState } from '../reducers/create_record.reducer';

export const createRecordSelect =
  createFeatureSelector<createRecordState>('createRecord');
export const updateRecordSelect =
  createFeatureSelector<createRecordState>('updateRecord');
