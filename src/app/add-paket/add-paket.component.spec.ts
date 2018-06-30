import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaketComponent } from './add-paket.component';

describe('AddPaketComponent', () => {
  let component: AddPaketComponent;
  let fixture: ComponentFixture<AddPaketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
