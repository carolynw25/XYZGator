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

  it('should have a title with GatorXYZ', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('GatorXYZ');
  });

  it('should have a line break after the title', () => {
    const br = fixture.nativeElement.querySelector('br');
    expect(br).toBeTruthy();
  });

  it('should have two cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toEqual(2);
  });

  it('should display the correct memory score', () => {
    component.lowestTimeMemory = { minutes: 1, seconds: 30 };
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('1:30');
  });

  it('should display "-" if there is no memory score', () => {
    component.lowestTimeMemory = null;
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('-');
  });
});
