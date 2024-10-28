import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarEditarArtefactoComponent } from './agregar-editar-artefacto.component';

describe('AgregarEditarArtefactoComponent', () => {
  let component: AgregarEditarArtefactoComponent;
  let fixture: ComponentFixture<AgregarEditarArtefactoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarArtefactoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEditarArtefactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
