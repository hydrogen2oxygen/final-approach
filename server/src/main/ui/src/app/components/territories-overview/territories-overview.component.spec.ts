import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoriesOverviewComponent } from './territories-overview.component';

describe('TerritoriesOverviewComponent', () => {
  let component: TerritoriesOverviewComponent;
  let fixture: ComponentFixture<TerritoriesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerritoriesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
