import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardControllerComponent } from './card-controller.component';

describe('CardControllerComponent', () => {
  let component: CardControllerComponent;
  let fixture: ComponentFixture<CardControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
