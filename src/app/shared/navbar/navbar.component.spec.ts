import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    htmlElement = debugElement.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle the sidebar when navbar-toggler is clicked', () => {
    spyOn(component, 'sidebarToggle');
    const navbarToggler = debugElement.query(By.css('.navbar-toggler')).nativeElement;
    navbarToggler.click();
    expect(component.sidebarToggle).toHaveBeenCalled();
  });

  //the little carrot bit i believe
  it('should have a button to toggle the sidebar', () => {
    const navbarToggle = debugElement.query(By.css('.navbar-toggle')).nativeElement;
    expect(navbarToggle).toBeTruthy();
  });

  // checks if the nc-bell-55 element exists in the HTML.
  it('should have a bell icon to access account notifications', () => {
    const bellIcon = debugElement.query(By.css('.nc-bell-55')).nativeElement;
    expect(bellIcon).toBeTruthy();
  });

  //checks if the nc-settings-gear-65 element exists in the HTML.
  it('should have a cog icon to access account settings', () => {
    const cogIcon = debugElement.query(By.css('.nc-settings-gear-65')).nativeElement;
    expect(cogIcon).toBeTruthy();
  });

  //checks that each dropdown goes to the correct place, whether that's the
  //login or register page
  it('should have a dropdown menu with correct links', () => {
    const dropdownMenu = debugElement.query(By.css('.dropdown-menu')).nativeElement;
    const dropdownItems = dropdownMenu.querySelectorAll('a');

    // Check the number of items in the dropdown menu
    expect(dropdownItems.length).toBe(3);

    // Check the links in the dropdown menu
    expect(dropdownItems[0].getAttribute('routerLink')).toBe('/login');
    expect(dropdownItems[1].getAttribute('routerLink')).toBe('/signup');
    expect(dropdownItems[2].getAttribute('routerLink')).toBe('/login');

  });

});



/*
 //
  it('should have a navbar with a title', () => {
    const title = component.getTitle();
    const navbarBrand = debugElement.query(By.css('.navbar-brand')).nativeElement;
    expect(navbarBrand.textContent).toContain(title);
  });
*/