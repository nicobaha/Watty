import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsOldPage } from './tabs-old.page';

describe('TabsOldPage', () => {
  let component: TabsOldPage;
  let fixture: ComponentFixture<TabsOldPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
