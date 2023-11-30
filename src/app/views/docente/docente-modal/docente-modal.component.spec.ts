import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteModalComponent } from './docente-modal.component';

describe('DocenteModalComponent', () => {
  let component: DocenteModalComponent;
  let fixture: ComponentFixture<DocenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
