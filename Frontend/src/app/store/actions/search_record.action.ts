import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { AllRecords } from '../../model';

export const searchRecord = createAction(
  '[SearchRecords Component] searchRecords',
  props<{ payload: string }>()
);
export const searchRecordSuccess = createAction(
  '[SearchRecords Component] searchRecordsSuccess',
  props<{ payload: AllRecords[]; total: number }>()
);
export const searchRecordFail = createAction(
  '[SearchRecords Component] searchRecordsFail',
  props<{ payload: string }>()
);
