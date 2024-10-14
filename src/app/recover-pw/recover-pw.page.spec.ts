import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPWPage } from './recover-pw.page';

describe('RecoverPWPage', () => {
  let component: RecoverPWPage;
  let fixture: ComponentFixture<RecoverPWPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPWPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
