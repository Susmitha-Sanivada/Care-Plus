import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecordsComponent } from './search-records.component';

describe('SearchRecordsComponent', () => {
  let component: SearchRecordsComponent;
  let fixture: ComponentFixture<SearchRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
