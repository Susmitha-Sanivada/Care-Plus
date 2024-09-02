import { createAction, props } from '@ngrx/store';
import { Tests } from '../../model';
export const loadTestData = createAction('[Create Component] testData');
export const loadTestDataSuccess = createAction(
  '[Create Component] testDataSuccess',
  props<{ payload: Tests[]; total: number }>()
);
export const loadTestDataFail = createAction(
  '[Create Component] testDataFail',
  props<{ payload: string }>()
);

export const loadSearchedTest = createAction(
  '[SeacrhTestsComponent] searchTestData',
  props<{ payload: string }>()
);
export const loadSearchedTestSuccess = createAction(
  '[SeacrhTestsComponent] searchTestDataSuccess',
  props<{ payload: Tests[]; total: number }>()
);
export const loadSearchedTestFail = createAction(
  '[SeacrhTestsComponent] searchTestDataFail',
  props<{ payload: string }>()
);
