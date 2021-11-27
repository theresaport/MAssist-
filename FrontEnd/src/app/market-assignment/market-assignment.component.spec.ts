import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAssignmentComponent } from './market-assignment.component';

describe('MarketAssignmentComponent', () => {
  let component: MarketAssignmentComponent;
  let fixture: ComponentFixture<MarketAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
