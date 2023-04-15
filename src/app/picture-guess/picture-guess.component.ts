import { Component, OnInit } from '@angular/core';

interface pictureObject {
  url: string;
  answer: string;
}

@Component({
  selector: 'app-picture-guess',
  template: `
 <div class ="outer">
  <div class="top-bar">
    <div class="lowestTime">
      <div class="score">Current Score: {{ score }}</div>
      <div class="highScore"> High Score: {{ highScore }} </div>
    </div>
    <div class="reset">
      <button (click)="bigReset();reset();">Reset</button>
    </div>
    <div class="return">
      <button routerLink="/notifications">Return</button>
    </div>
  </div>
  <div class="image-container">
    <img [src]="pictures[selection].url" class="picture">
    <button class = "next" (click)="nextQuestion()">Next Question</button>
</div>
<div class="AnswerChoices">
  <button class = "answers" (click)="checkAnswer(answers[indices[0]])">{{ answers[indices[0]] }}</button>
  <button class = "answers" (click)="checkAnswer(answers[indices[1]])">{{ answers[indices[1]] }}</button>
  <button class = "answers" (click)="checkAnswer(answers[indices[2]])">{{ answers[indices[2]] }}</button>
  <button class = "answers" (click)="checkAnswer(answers[indices[3]])">{{ answers[indices[3]] }}</button>
  <button class = "answers" (click)="checkAnswer(answers[indices[4]])">{{ answers[indices[4]] }}</button>
  <button class = "answers" (click)="checkAnswer(answers[indices[5]])">{{ answers[indices[5]] }}</button>
  </div>
  
 </div>
  `,
  styles: [`
    .outer {
      padding: 20px;
      min-height: 100vh;
      background-color: lavender;
    }
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .highScore{
      font-size: 2rem;
      text-align: left;
      justify-content: flex-start;
    }
    .score {
      font-size: 2rem;
      text-align: left;
      justify-content: flex-start;
    }
    .reset{
      font-size: 2rem;
      margin-right: 20px;
      justify-content: center;
    }
    .return{
      font-size: 2rem;
      margin-right: 20px;
      justify-content: flex-end;
    }

    .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    }
    .picture {
      width: auto;
      height: 400px;
      margin-bottom: 10px;
    }
    button {
    margin-top: 10px;
    }
    .AnswerChoices {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
    .answers {
      margin-right: 50px;
      font-size: 20px;
      padding: 10px;
      font-weight: bold;
      width: 180px; 
    }
    .correct {
      background-color: green;
    }
    .incorrect {
      background-color: red;
    }
    .next {
      margin-right: 50px;
      font-size: 14px;
      width: 180px; 
      height: 45px;
      font-weight: bold;
      align-items: center;
      background-color: white;
    }
  `]
 })
export class PictureGuessComponent implements OnInit {
  pictures: pictureObject[] = [];
  selection: number = 0;
  score: number = 0;
  highScore: number = 0;
  answers = [];
  imageNames = [
  "assets/img/pictureGame/alligator.png",
  "assets/img/pictureGame/alpaca.png",
  "assets/img/pictureGame/ant.png",
  "assets/img/pictureGame/armadillo.png",
  "assets/img/pictureGame/bat.png",
  "assets/img/pictureGame/bee.png",
  "assets/img/pictureGame/bird.png",
  "assets/img/pictureGame/butterfly.png",
  "assets/img/pictureGame/camel.png",
  "assets/img/pictureGame/cat.png",
  "assets/img/pictureGame/chicken.png",
  "assets/img/pictureGame/cow.png",
  "assets/img/pictureGame/crab.png",
  "assets/img/pictureGame/deer.png",
  "assets/img/pictureGame/dog.png",
  "assets/img/pictureGame/dolphin.png",

  "assets/img/pictureGame/donkey.png",
  "assets/img/pictureGame/duck.png",
  "assets/img/pictureGame/eagle.png",
  "assets/img/pictureGame/elephant.png",
  "assets/img/pictureGame/fish.png",
  "assets/img/pictureGame/flamingo.png",
  "assets/img/pictureGame/frog.png",
  "assets/img/pictureGame/goat.png",
  "assets/img/pictureGame/gorilla.png",
  "assets/img/pictureGame/hamster.png",
  "assets/img/pictureGame/horse.png",
  "assets/img/pictureGame/kangaroo.png",
  "assets/img/pictureGame/lion.png",
  "assets/img/pictureGame/monkey.png",
  "assets/img/pictureGame/owl.png",
  "assets/img/pictureGame/panda.png",

  "assets/img/pictureGame/penguin.png",
  "assets/img/pictureGame/pig.png",
  "assets/img/pictureGame/hedgehog.png",
  "assets/img/pictureGame/rabbit.png",
  "assets/img/pictureGame/raccoon.png",
  "assets/img/pictureGame/rat.png",
  "assets/img/pictureGame/skunk.png",
  "assets/img/pictureGame/snail.png",
  "assets/img/pictureGame/snake.png",
  "assets/img/pictureGame/spider.png",
  "assets/img/pictureGame/tiger.png",
  "assets/img/pictureGame/orca.png",
  "assets/img/pictureGame/zebra.png",
  "assets/img/pictureGame/otter.png",
  "assets/img/pictureGame/cheetah.png",
  ];

  gameOver: boolean = false;
  clickedAnswer: boolean = false;

  nextQuestion(){
    //have a vector with numbers pointing to pictures index and then remove each time it has been passed
    if (!this.gameOver && this.clickedAnswer) {
      console.log(this.pictures);
      console.log(this.selection);
      this.pictures = this.pictures.filter(pictureObject => pictureObject.answer !== this.pictures[this.selection].answer);
      console.log(this.pictures);
      this.reset();
    }
    
  }

  indices = [];

  constructor() { 
    this.bigReset();
    this.reset();

  }
  reset(){    
    this.selection = Math.floor(Math.random() * this.pictures.length);
    //this.pictures.splice(this.selection,1);
    //this.pictures = this.pictures.filter(pictureObject => pictureObject.answer !== this.pictures[this.selection].answer);

    this.clickedAnswer = false;
    this.gameOver = false;
    this.indices = [];
    this.indices.push(this.answers.indexOf(this.pictures[this.selection].answer));

    //find answer in selection for answer index
    while (this.indices.length < 6) {
      const index = Math.floor(Math.random() * this.answers.length);
      if (!this.indices.includes(index)) {
        this.indices.push(index);
      }
    }
    this.shuffle();
    // Remove the "incorrect" class from all number elements
    const numberElements = document.querySelectorAll('.answers');
    numberElements.forEach((element) => {
    element.classList.remove('incorrect');
    element.classList.remove('correct');
  });
  }
  checkAnswer(answer: string) {
    if (this.clickedAnswer == false){
      if (answer === this.pictures[this.selection].answer) {
        const targetElement = event.target as HTMLElement;
        targetElement.classList.add('correct');
        this.score++;
        if (this.pictures.length == 1){
          this.gameOver = true;
          this.highScore = this.score;
          alert("You a genius kiddo! Rest your brain.")
        }
      } else { //incorrect
        const targetElement = event.target as HTMLElement;
        targetElement.classList.add('incorrect');
        if (this.highScore < this.score) {
          this.highScore = this.score;
        }
        this.gameOver = true;
        this.score = 0;
      }
    }
    this.clickedAnswer = true;
  }
  bigReset(){
    this.pictures=[];
    for (let i = 0; i < this.imageNames.length; i++){
      const start = this.imageNames[i].lastIndexOf("/") + 1;
      const end = this.imageNames[i].lastIndexOf(".png");
      this.pictures.push({url: this.imageNames[i], answer: this.imageNames[i].substring(start, end)});
      this.answers.push(this.imageNames[i].substring(start, end));
    }
    this.score = 0;
  }
  shuffle(){
    // Fisher-Yates shuffle
    for (let i = this.indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.indices[i], this.indices[j]] = [this.indices[j], this.indices[i]];
    }
  }

  ngOnInit(): void {
  }

}
