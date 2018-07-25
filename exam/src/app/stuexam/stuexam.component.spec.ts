import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuexamComponent } from './stuexam.component';

describe('StuexamComponent', () => {
  let component: StuexamComponent;
  let fixture: ComponentFixture<StuexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
