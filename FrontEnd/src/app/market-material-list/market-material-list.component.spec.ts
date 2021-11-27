import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMaterialListComponent } from './market-material-list.component';

describe('MarketMaterialListComponent', () => {
  let component: MarketMaterialListComponent;
  let fixture: ComponentFixture<MarketMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketMaterialListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
