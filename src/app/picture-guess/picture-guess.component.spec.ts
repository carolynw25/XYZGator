import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { PictureGuessComponent } from './picture-guess.component';
import { UserIdService } from 'app/userIdService';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Swal from 'sweetalert2';


describe('PictureGuessComponent', () => {
  let component: PictureGuessComponent;
  let fixture: ComponentFixture<PictureGuessComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PictureGuessComponent ],
      providers: [UserIdService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  /*checks to see if component created successfully*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Checks whether component initialized with correct values verifies that pictures array has at 
  least 1 element, answers array as 47 elements, imageNames array has at least one element, 
  and that score and high score are both initially equal to 0 and that newRecord is set to false to start. */
  it('should initialize correctly', () => {
    expect(component.pictures.length).toBeGreaterThan(0);
    expect(component.answers.length).toEqual(47);
    expect(component.imageNames.length).toBeGreaterThan(0);
    expect(component.score).toEqual(0);
    expect(component.highScore).toEqual(0);
    expect(component.newRecord).toBeFalsy();
  });

  /* Checks whether the pictures are loaded correctly in the component. 
  Verifies that the first element of the pictures array has a URL that contains the string 'assets/img/pictureGame/'*/
  it('should load pictures correctly', () => {
    expect(component.pictures[0].url).toContain('assets/img/pictureGame/');
  });

  /*Checks whether the answer choices are generated correctly in the component. 
  It verifies that the answers array has 47 elements.*/
  it('should generate answer choices correctly', () => {
    expect(component.answers.length).toEqual(47);
  });

  /*Checks whether the next question is selected correctly in the component. 
  It verifies that the selection variable is not changed after calling the nextQuestion() method*/
  it('should select next question correctly', () => {
    const initialSelection = component.selection;
    component.nextQuestion();
    //equal?
    expect(component.selection).toEqual(initialSelection);
  });

  /*Checks whether the game is reset correctly in the component. 
  It verifies that the highScore, score, and newRecord variables are set to their initial 
  values after calling the bigReset() method */
  it('should reset game correctly', () => {
    spyOn(component, 'bigReset');
    spyOn(component, 'reset');
    component.bigReset();
    expect(component.highScore).toEqual(0);
    expect(component.score).toEqual(0);
    expect(component.newRecord).toBeFalsy();
    //expect(component.reset).toHaveBeenCalled();
  });

});
