import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StusubjectComponent } from './stusubject.component';

describe('StusubjectComponent', () => {
  let component: StusubjectComponent;
  let fixture: ComponentFixture<StusubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StusubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StusubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
