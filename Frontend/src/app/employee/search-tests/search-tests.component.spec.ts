import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTestsComponent } from './search-tests.component';

describe('SearchTestsComponent', () => {
  let component: SearchTestsComponent;
  let fixture: ComponentFixture<SearchTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
