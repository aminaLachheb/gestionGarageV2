import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVoitureComponent } from './dashboard-voiture.component';

describe('DashboardVoitureComponent', () => {
  let component: DashboardVoitureComponent;
  let fixture: ComponentFixture<DashboardVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVoitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
