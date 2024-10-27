import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HogarModalPage } from './hogar-modal.page';

describe('HogarModalPage', () => {
  let component: HogarModalPage;
  let fixture: ComponentFixture<HogarModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HogarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
