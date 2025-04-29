import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewallaccountsComponent } from './managerviewallaccounts.component';

describe('ManagerviewallaccountsComponent', () => {
  let component: ManagerviewallaccountsComponent;
  let fixture: ComponentFixture<ManagerviewallaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewallaccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewallaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
