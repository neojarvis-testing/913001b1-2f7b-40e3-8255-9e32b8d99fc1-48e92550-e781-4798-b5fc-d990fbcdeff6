import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewalltransactionsComponent } from './managerviewalltransactions.component';

describe('ManagerviewalltransactionsComponent', () => {
  let component: ManagerviewalltransactionsComponent;
  let fixture: ComponentFixture<ManagerviewalltransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewalltransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewalltransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
