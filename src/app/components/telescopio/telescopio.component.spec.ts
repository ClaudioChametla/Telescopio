import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopioComponent } from './telescopio.component';

describe('TelescopioComponent', () => {
  let component: TelescopioComponent;
  let fixture: ComponentFixture<TelescopioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelescopioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelescopioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
