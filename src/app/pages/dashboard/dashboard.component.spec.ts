import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  /* checks if title of dashboard correctly set to GatorXYZ*/
  //querySelector methods finds h2 element in template to check content
  it('should have a title with GatorXYZ', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('GatorXYZ');
  });

  /* Checks if there is a line break after title*/
  it('should have a line break after the title', () => {
    const br = fixture.nativeElement.querySelector('br');
    expect(br).toBeTruthy();
  });

  /* Checks if there are two cards in HTML template */
  it('should have two cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toEqual(2);
  });

  /* This sets lowestTimeMemory to a minute 30 and then checks if memory score is 
  displayed correctly  */
  it('should display the correct memory score', () => {
    component.lowestTimeMemory = { minutes: 1, seconds: 30 };
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('1:30');
  });

  /* This sets lowestTimeMemory property of component to 'null' and checks if memory score is displayed as '-' */
  it('should display "-" if there is no memory score', () => {
    component.lowestTimeMemory = null;
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('-');
  });
});
