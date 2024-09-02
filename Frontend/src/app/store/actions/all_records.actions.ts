import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { AllRecords } from '../../model';

export const loadAllRecordsData = createAction(
  '[Employee Component] allRecords',
  props<{ page: number }>()
);
export const loadAllRecordsDataSuccess = createAction(
  '[Employee Component] allRecordsSucces',
  props<{ payload: AllRecords[]; total: number }>()
);
export const loadAllRecordsDataFail = createAction(
  '[Employee Component] allRecordsFail',
  props<{ payload: string }>()
);
