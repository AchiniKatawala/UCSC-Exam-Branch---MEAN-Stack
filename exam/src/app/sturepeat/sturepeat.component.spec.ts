import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SturepeatComponent } from './sturepeat.component';

describe('SturepeatComponent', () => {
  let component: SturepeatComponent;
  let fixture: ComponentFixture<SturepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SturepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SturepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
