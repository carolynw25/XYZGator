import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test case to check if addUser() function adds a new user to the user list
  it('should add a new user to the user list when addUser() is called', () => {
    const initialUserCount = component.userInfo.length;
    component.username = 'tUser';
    component.password = 'tPass';
    component.firstname = 'Huey';
    component.lastname = 'Magooey';
    component.email = 'HuMagoo@gmail.com';
    component.addUser();
    const newUserCount = component.userInfo.length;
    expect(newUserCount).toEqual(initialUserCount + 1);
    expect(component.userInfo[newUserCount - 1]).toEqual({
      username: 'tUser',
      password: 'tPass',
      firstname: 'Huey',
      lastname: 'Magooey',
      email: 'HuMagoo@gmail.com'
    });
  });

  //Test case to check if the input fields are cleared after addUser() is called
  it('should clear the input fields after addUser() is called', () => {
    component.username = 'tUser';
    component.password = 'tPass';
    component.firstname = 'Huey';
    component.lastname = 'Magooey';
    component.email = 'HuMagoo@gmail.com';
    component.addUser();
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
    expect(component.firstname).toEqual('');
    expect(component.lastname).toEqual('');
    expect(component.email).toEqual('');
  });

  
});
