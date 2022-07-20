import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaSolarComponent } from './sistema-solar.component';

describe('SistemaSolarComponent', () => {
  let component: SistemaSolarComponent;
  let fixture: ComponentFixture<SistemaSolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemaSolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
