import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { allRecordsState } from '../../store/reducers/all_records.reducer';
import { Store } from '@ngrx/store';
import { searchRecordSelector } from '../../store/selectors/search_record.selector';
import { searchRecord } from '../../store/actions/search_record.action';
import { loadAllRecordsData } from '../../store/actions/all_records.actions';
import { allRecordsSelector } from '../../store/selectors/all_records.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-records',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-records.component.html',
  styleUrl: './search-records.component.css',
})
export class SearchRecordsComponent {
  searchVal: string | null = null;
  err: boolean = true;

  searchData$!: Observable<allRecordsState>;
  constructor(
    private store: Store<{
      searchRecord: allRecordsState;
      allRecords: allRecordsState;
    }>,
    private router: Router
  ) {
    this.searchData$ = this.store.select(allRecordsSelector);
    this.store.dispatch(loadAllRecordsData({ page: 1 }));
  }
  onSearch() {
    if (this.searchVal) {
      this.searchData$ = this.store.select(searchRecordSelector);
      this.store.dispatch(searchRecord({ payload: this.searchVal }));
    }
    this.searchVal = null;
  }
  onClick() {
    this.router.navigate(['home/employee/patientDetails']);
  }
}
