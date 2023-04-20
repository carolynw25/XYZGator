import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ForgetPasswordComponent } from './forget-password.component';
import { UserIdService } from 'app/userIdService';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let userIdService: UserIdService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UserIdService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userIdService = TestBed.inject(UserIdService);
  });

  //This test verifies that the component is created successfully, which ensures 
  //that its constructor and initialization code are error-free.
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //This test checks that the component's forgetPasswordForm property is 
  //initialized correctly. Specifically, it ensures that the form has fields for email, security question, and new password.
  it('should initialize the form', () => {
    expect(component.forgetPasswordForm.get('email')).toBeTruthy();
    expect(component.forgetPasswordForm.get('securityQuestion')).toBeTruthy();
    expect(component.forgetPasswordForm.get('newPass')).toBeTruthy();
  });

  //This test checks that the form is reset after it is submitted. 
  //It simulates a form submission event by dispatching a submit event on the form element, 
  //then verifies that the form values are cleared out.
  it('should reset form after submission', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.forgetPasswordForm.value.email).toEqual('');
    expect(component.forgetPasswordForm.value.securityQuestion).toEqual('');
    expect(component.forgetPasswordForm.value.newPass).toEqual('');
  });

});
