import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Result } from '../model';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEmployee } from '../store/selectors/employee.selector';
import { State } from '../store/reducers/employee.reducer';
import { loadEmployeeData } from '../store/actions/employee.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  employee!: Observable<State>;
  constructor(private store: Store<{ employee: State }>) {}
  ngOnInit(): void {
    // select the employee data from store
    this.employee = this.store.select(selectEmployee);
  }
  onClickLogin(form: NgForm) {
    if (form.valid === true) {
      // if form is valid then dispatch the action
      this.store.dispatch(loadEmployeeData({ params: form.value }));
      // }reset the form
      form.reset();
    }
  }
}
