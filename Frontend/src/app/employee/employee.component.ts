import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers/employee.reducer';
import { loadEmployeeDataClear } from '../store/actions/employee.actions';
import { Observable } from 'rxjs';
import { selectEmployee } from '../store/selectors/employee.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ employee: State }>
  ) {
    this.employee$ = this.store.select(selectEmployee);
  }
  employee$!: Observable<State>;

  onClickHome() {
    this.router.navigate(['home']);
  }
  onClickRecent() {
    // window.scrollTo({ top: 200, behavior: 'smooth' });
    this.router.navigate(['recent'], { relativeTo: this.route });
  }
  onClickCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  onClickSearchRecords() {
    this.router.navigate(['searchRecords'], { relativeTo: this.route });
    // window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  onClickSearchTests() {
    this.router.navigate(['searchTests'], { relativeTo: this.route });
    // window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  onClickPatientDetails() {
    this.router.navigate(['patientDetails'], { relativeTo: this.route });
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  onClickProfile() {
    this.store.dispatch(loadEmployeeDataClear());
    this.router.navigate(['home']);
  }
  // recieveId($event: String) {
  //   this.patient_id = $event;
  // }
}
