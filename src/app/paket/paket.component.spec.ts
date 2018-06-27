import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './paket.component';

describe('PaketComponent', () => {
  let component: PaketComponent;
  let fixture: ComponentFixture<PaketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
