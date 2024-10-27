import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmbienteModalPage } from './ambiente-modal.page';

describe('AmbienteModalPage', () => {
  let component: AmbienteModalPage;
  let fixture: ComponentFixture<AmbienteModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbienteModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
