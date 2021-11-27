import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarketMaterialComponent } from './add-market-material.component';

describe('AddMarketMaterialComponent', () => {
  let component: AddMarketMaterialComponent;
  let fixture: ComponentFixture<AddMarketMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMarketMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarketMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
