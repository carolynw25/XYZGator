import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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


});
