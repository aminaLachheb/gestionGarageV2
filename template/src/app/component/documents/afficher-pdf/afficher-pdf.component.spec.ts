import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPDFComponent } from './afficher-pdf.component';

describe('AfficherPDFComponent', () => {
  let component: AfficherPDFComponent;
  let fixture: ComponentFixture<AfficherPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
