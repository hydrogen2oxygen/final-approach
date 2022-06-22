import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsCollectionComponent } from './maps-collection.component';

describe('MapsCollectionComponent', () => {
  let component: MapsCollectionComponent;
  let fixture: ComponentFixture<MapsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
