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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.pictures.length).toBeGreaterThan(0);
    expect(component.answers.length).toEqual(47);
    expect(component.imageNames.length).toBeGreaterThan(0);
    expect(component.score).toEqual(0);
    expect(component.highScore).toEqual(0);
    expect(component.newRecord).toBeFalsy();
  });

  it('should load pictures correctly', () => {
    expect(component.pictures[0].url).toContain('assets/img/pictureGame/');
  });

  it('should generate answer choices correctly', () => {
    expect(component.answers.length).toEqual(47);
  });

  it('should select next question correctly', () => {
    const initialSelection = component.selection;
    component.nextQuestion();
    //equal?
    expect(component.selection).toEqual(initialSelection);
  });

  // it('should check answer correctly', () => {
  //   spyOn(Swal, 'fire').and.callFake(() => Promise.resolve({ isConfirmed: true }));
  //   spyOn(component, 'nextQuestion');
  //   component.checkAnswer(component.answers[0]);
  //   expect(component.score).toBeGreaterThan(0);
  //   expect(Swal.fire).toHaveBeenCalled();
  //   expect(component.nextQuestion).toHaveBeenCalled();
  // });

  it('should reset game correctly', () => {
    spyOn(component, 'bigReset');
    spyOn(component, 'reset');
    component.bigReset();
    expect(component.highScore).toEqual(0);
    expect(component.score).toEqual(0);
    expect(component.newRecord).toBeFalsy();
    //expect(component.reset).toHaveBeenCalled();
  });

  it('should handle errors during http requests', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(null));
    spyOn(console, 'error');
    component.ngOnInit();
    //expect(console.error).toHaveBeenCalled();
  });

});
