import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMaterialAssignmentComponent } from './market-material-assignment.component';

describe('MarketMaterialAssignmentComponent', () => {
  let component: MarketMaterialAssignmentComponent;
  let fixture: ComponentFixture<MarketMaterialAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketMaterialAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMaterialAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
