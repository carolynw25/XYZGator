import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //checks if the SignupComponent instance is created successfully 
  //using the expect function. If the component is created successfully, 
  //the toBeTruthy matcher returns true, indicating that the component 
  //is truthy and exists.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //tests whether the username and password properties of the component
  // are empty strings on initialization.
  it('should have an empty username and password on initialization', () => {
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });

  //tests whether the username and password properties of the component are 
  //updated correctly when the input fields change.
  it('should update the username and password properties when the input fields change', () => {
    const inputUsername = fixture.nativeElement.querySelector('#exampleInputEmail1');
    const inputPassword = fixture.nativeElement.querySelector('#exampleInputPassword1');

    inputUsername.value = 'testuser';
    inputUsername.dispatchEvent(new Event('input'));

    inputPassword.value = 'testpassword';
    inputPassword.dispatchEvent(new Event('input'));

    expect(component.username).toEqual('testuser');
    expect(component.password).toEqual('testpassword');
  });

  /*
  How the above code works: select input fields for username and password using querySelector method
  and stores in inputUsername and inputPassword variables. Then, it simulates the user input by 
  setting the value property of the input fields to 'testuser' and 'testpassword'. Then puts 
  an input event on each input field using dispatchEvent method. This simulates user typing in the 
  input fields thus trigger input event. Then, it checks that the username and password properties 
  of the component have been updated to 'testuser' and 'testpassword', using expect method. 
  If the component U and P not updated as expected, test will fail.
  */

});


