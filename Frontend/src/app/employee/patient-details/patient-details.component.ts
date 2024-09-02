import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AllRecords } from '../../model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateRecord } from '../../store/actions/create_records.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent implements OnInit {
  patientName!: string;
  details$!: Observable<AllRecords | null>;
  constructor(
    private service: SharedService,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.details$ = this.service.patientDetails$;
    this.details$.subscribe((data) => {
      console.log(data);
    });
  }

  onPaid() {
    this.details$.subscribe((data) => {
      this.store.dispatch(
        updateRecord({
          _id: data?._id as string,
          Body: { Payment_Status: true },
        })
      );
    });
  }
  onCollected() {
    this.details$.subscribe((data) => {
      this.store.dispatch(
        updateRecord({
          _id: data?._id as string,
          Body: { Collection_Status: true },
        })
      );
      this.patientName = data?.Name as string;
      console.log(data);
    });
    this.service.fetchDataUsingName(this.patientName);
  }
}
