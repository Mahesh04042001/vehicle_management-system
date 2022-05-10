import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstmenuComponent } from './firstmenu.component';

describe('FirstmenuComponent', () => {
  let component: FirstmenuComponent;
  let fixture: ComponentFixture<FirstmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
