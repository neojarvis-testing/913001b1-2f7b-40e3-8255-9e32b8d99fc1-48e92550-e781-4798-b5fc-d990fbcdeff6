import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermytransactionsComponent } from './customermytransactions.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomermytransactionsComponent', () => {
  let component: CustomermytransactionsComponent;
  let fixture: ComponentFixture<CustomermytransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomermytransactionsComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomermytransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_Customermytransactions_Component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_Transaction_Details_heading_in_the_Customermytransactions_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Transaction Details');
  });
});
