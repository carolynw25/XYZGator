import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureGuessComponent } from './picture-guess.component';

describe('PictureGuessComponent', () => {
  let component: PictureGuessComponent;
  let fixture: ComponentFixture<PictureGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureGuessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
