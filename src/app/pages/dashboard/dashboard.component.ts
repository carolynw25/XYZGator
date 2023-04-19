import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ViewChild } from '@angular/core';
import { UserIdService } from 'app/userIdService';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  scoreMemory : number = 0;
  scoreMath : number = 0;
  scoreWord : number = 0;
  scorePicture : number = 0;


  userID: number;

  constructor(
    private userIDService: UserIdService,
    private http: HttpClient
    ) { }

  getUserScoreMemory(ID: number): Observable<number> {//memory
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/matchscore'
    return this.http.get<number>(url);
  }

  getUserScoreMath(ID: number): Observable<number> {//math
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/mathscore'
    return this.http.get<number>(url);
  }

  getUserScoreWord(ID: number): Observable<number> { //wordSearch
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/wordscore'
    return this.http.get<number>(url);
  }

  getUserScorePicture(ID: number): Observable<number> { //picture
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/animalscore'
    return this.http.get<number>(url);
  }

    ngOnInit(){

    this.userID = this.userIDService.getUserId();
    console.log('User ID ohmygoditworked: ', this.userID);

    // Memory
    this.getUserScoreMemory(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(score => {
      if (score == 999999999999999){
        this.scoreMemory = null;
      }
      else{
        this.scoreMemory = score;
      }

    });

    // Math
    this.getUserScoreMath(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(score => {
      this.scoreMath = score;
      if (this.scoreMath < 0) {
        this.scoreMath = 0;
      }
    });

    // Word Search
    this.getUserScoreWord(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(score => {
      if (score == 99999999999999999){
        this.scoreWord = null;
      }
      else{
        this.scoreWord = score;
      }
    });

    // Picture
    this.getUserScorePicture(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(score => {
      this.scorePicture = score;
      if (this.scorePicture < 0) {
        this.scorePicture = 0;
      }
    });


    
    }
}
