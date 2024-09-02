import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { allTestsState } from '../../store/reducers/tests.reducer';
import { Observable } from 'rxjs';
import {
  selectSearchedTests,
  selectTests,
} from '../../store/selectors/tests.selector';
import {
  loadSearchedTest,
  loadTestData,
} from '../../store/actions/tests.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-tests',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-tests.component.html',
  styleUrl: './search-tests.component.css',
})
export class SearchTestsComponent {
  testVal!: string | null;
  tests$!: Observable<allTestsState>;

  constructor(
    private store: Store<{ tests: allTestsState; searchTests: allTestsState }>
  ) {
    this.tests$ = this.store.select(selectTests);
    this.store.dispatch(loadTestData());
    this.tests$.subscribe((data) => {
      console.log(data);
    });
  }
  onSearch() {
    console.log(this.testVal);
    if (this.testVal) {
      this.tests$ = this.store.select(selectSearchedTests);
      this.store.dispatch(loadSearchedTest({ payload: this.testVal }));
      this.tests$.subscribe((data) => console.log(data));
    }
    this.testVal = null;
  }
  onAllTests() {
    this.tests$ = this.store.select(selectTests);
    this.store.dispatch(loadTestData());
  }
}
