import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEstrellaComponent } from './tipo-estrella.component';

describe('TipoEstrellaComponent', () => {
  let component: TipoEstrellaComponent;
  let fixture: ComponentFixture<TipoEstrellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEstrellaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
