import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryDetailComponent } from './territory-detail.component';

describe('TerritoryDetailComponent', () => {
  let component: TerritoryDetailComponent;
  let fixture: ComponentFixture<TerritoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerritoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
