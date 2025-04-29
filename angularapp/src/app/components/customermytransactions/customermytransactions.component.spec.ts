import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermytransactionsComponent } from './customermytransactions.component';

describe('CustomermytransactionsComponent', () => {
  let component: CustomermytransactionsComponent;
  let fixture: ComponentFixture<CustomermytransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomermytransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomermytransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
