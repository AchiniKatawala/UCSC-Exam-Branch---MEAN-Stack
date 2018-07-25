import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuhomeComponent } from './stuhome.component';

describe('StuhomeComponent', () => {
  let component: StuhomeComponent;
  let fixture: ComponentFixture<StuhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
