import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPrixVenteComponent } from './ajouter-prix-vente.component';

describe('AjouterPrixVenteComponent', () => {
  let component: AjouterPrixVenteComponent;
  let fixture: ComponentFixture<AjouterPrixVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPrixVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPrixVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
