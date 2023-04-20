import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserComponent } from './user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case for checking whether the form fields exist or not.
  it('should have all the form fields', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const inputFields = form.querySelectorAll('input');
    expect(inputFields.length).toBe(5);
  });

  // Test case for checking the functionality of the "Update Profile" button.
  it('should call updateUserData() function when Update Profile button is clicked', () => {
    spyOn(component, 'updateUserData');
    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.updateUserData).toHaveBeenCalled();
  });

  // Test case for checking whether the form fields are being updated or not.
  it('should update the corresponding variable when the input field is updated', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));
    expect(component.username).toBe('testuser');
  });


});
