import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewallaccountsComponent } from './managerviewallaccounts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerviewallaccountsComponent', () => {
  let component: ManagerviewallaccountsComponent;
  let fixture: ComponentFixture<ManagerviewallaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewallaccountsComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewallaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Managerviewallaccounts_Component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_All_Accounts_heading_in_the_Managerviewallaccounts_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('All Accounts');
  });
});
