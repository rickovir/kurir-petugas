import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaketComponent } from './update-paket.component';

describe('UpdatePaketComponent', () => {
  let component: UpdatePaketComponent;
  let fixture: ComponentFixture<UpdatePaketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
