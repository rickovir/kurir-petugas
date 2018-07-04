import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaraDetailComponent } from './acara-detail.component';

describe('AcaraDetailComponent', () => {
  let component: AcaraDetailComponent;
  let fixture: ComponentFixture<AcaraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
