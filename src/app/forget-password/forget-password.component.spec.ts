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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.forgetPasswordForm.get('email')).toBeTruthy();
    expect(component.forgetPasswordForm.get('securityQuestion')).toBeTruthy();
    expect(component.forgetPasswordForm.get('newPass')).toBeTruthy();
  });

  it('should reset form after submission', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.forgetPasswordForm.value.email).toEqual('');
    expect(component.forgetPasswordForm.value.securityQuestion).toEqual('');
    expect(component.forgetPasswordForm.value.newPass).toEqual('');
  });

});
