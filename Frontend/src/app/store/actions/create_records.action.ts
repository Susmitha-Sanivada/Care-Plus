import { createAction, props } from '@ngrx/store';
import { AllRecords, updateRecordData } from '../../model';

export const createRecord = createAction(
  '[Create Component] createRecord',
  props<{ payload: string }>()
);
export const createRecordSuccess = createAction(
  '[Create Component] createRecordSuccess',
  props<{ payload: AllRecords }>()
);
export const createRecordFail = createAction(
  '[Create Component] createRecordFail',
  props<{ payload: string }>()
);

export const updateRecord = createAction(
  '[Create Component] updateRecord',
  props<{ _id: string; Body: updateRecordData }>()
);
export const updateRecordSuccess = createAction(
  '[Create Component] updateRecordSuccess'
);
export const updateRecordFail = createAction(
  '[Create Component] updateRecordFail',
  props<{ payload: string }>()
);
