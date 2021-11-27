import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMaterialComponent } from './market-material.component';

describe('MarketMaterialComponent', () => {
  let component: MarketMaterialComponent;
  let fixture: ComponentFixture<MarketMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
