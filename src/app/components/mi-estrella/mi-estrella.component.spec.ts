import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiEstrellaComponent } from './mi-estrella.component';

describe('MiEstrellaComponent', () => {
  let component: MiEstrellaComponent;
  let fixture: ComponentFixture<MiEstrellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiEstrellaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
