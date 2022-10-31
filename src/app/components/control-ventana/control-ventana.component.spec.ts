import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlVentanaComponent } from './control-ventana.component';

describe('ControlVentanaComponent', () => {
  let component: ControlVentanaComponent;
  let fixture: ComponentFixture<ControlVentanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlVentanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlVentanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
