import { Component, ViewEncapsulation, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import Keyboard from "simple-keyboard";
import helper from 'src/app/helper';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-spelling',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.css']
})
export class SpellingComponent implements OnInit, OnChanges {
  keyboard!: Keyboard;
  value = "";
  placeholder = "Write the phrase";
  showAnswer:boolean = false;
  correct:boolean = false;

  isDesktopDevice: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  textIndent: string = "0px";
  @ViewChild('spelling') spellingElement: ElementRef | undefined;
  @ViewChild('spellingPlaceholder', {static: true}) spellingPlaceholder: ElementRef | undefined;

  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  constructor(private questionsService: QuestionsService, private deviceService: DeviceDetectorService) {
    this.value = "";
    this.placeholder = "Write the phrase";
    this.showAnswer = false;
    this.correct = false;
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  ngAfterViewInit() {
    this.deviceCheck();
    this.keyboard = new Keyboard({
      layout: this.setKeyboardLayout(),
      onChange: (input: any) => this.onChange(input),
      onKeyPress: (button: any) => this.onKeyPress(button)
    });

  }

  ngOnInit() {
    //this.firstRun();
  }

  deviceCheck() {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    if(this.isDesktopDevice){
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.spellingElement?.nativeElement.focus();
      },0); 
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.deviceCheck();
      this.firstRun();
      this.value = "";
      this.showAnswer = false;
      this.correct = false;
      if(this.keyboard){
        this.keyboard.setOptions({layout: this.setKeyboardLayout()});
        this.keyboard.setInput("");
      }
    }
  }

  verifyQuestion() {
    this.correct = this.question.data.phrase_correct === this.value;
    this.showAnswer = true;
    return this.correct;
  }

  firstRun() {
    this.say_1();
    if(this.question.data.help_underscores){
      this.placeholder = "";
      var phrase = this.question.data.phrase_correct;
      var underScoresLen = this.question.data.phrase_correct.length;
      for (let i = 0; i < underScoresLen; i++) {
        if(phrase[i] === " ") {
          this.placeholder += " ";
        } else {
          this.placeholder += "_";
        }
      }
      setTimeout(() => {
        this.textIndent = `calc(50% - ${(this.spellingPlaceholder?.nativeElement.clientWidth/2)}px)`;
      }, 500)
    }
  }

  setKeyboardLayout() {
    var keyBoardLayout = this.question.data.keyboard_config;
    if(this.question.data.disordered_keyboard && keyBoardLayout){
      if(keyBoardLayout.default){
        keyBoardLayout.default = keyBoardLayout.default.map((x: any) => {
          return this.shuffle(x.split(" ")).join(" ");
        });
      }
      if(keyBoardLayout.shift){
        keyBoardLayout.shift = keyBoardLayout.shift.map((x: any) => {
          return this.shuffle(x.split(" ")).join(" ");
        })
      }
    }
    return keyBoardLayout;
  }

  shuffle(array: Array<any>) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  onChange = (input: string) => {
    //console.log("Input changed", input);
    if(this.question.data.help_underscores){
      this.value = "";
      var phrase = this.question.data.phrase_correct;
      var underScoresLen = this.question.data.phrase_correct.length;
      var vi = 0;
      for (let i = 0; i < underScoresLen; i++) {
        if(input[vi]){
          if(phrase[i] === " " && input[vi] !== ""){
            this.value += "" + input[vi];
          } else if(phrase[i] !== " " && input[vi] === " ") {
            this.value += " ";
          } else {
            this.value += input[vi];
          }
        } else {
          if(phrase[i] === " "){
            this.value += " ";
          } else {
            this.value += "_";
          }
        }
        
        vi++;
      }
      this.keyboard.setInput(input.slice(0, (phrase.length)));
    } else {
      this.value = input;
    }
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    var input = event.target.value;
    this.value = input;
    this.keyboard.setInput(input);
    console.log(this.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  async say_1() { //music
    const audio = new Audio(this.question.data.spellingIntroAudio);
    audio.id = Math.round(Math.random() * 100000000).toString();

    audio.onended = () => {
      audio.onended = null;
      this.say_2();
    }

    audio.load();
    audio.play();
  }

  async say_2() { //music
    const audio = new Audio(this.question.data.questionTextAudio);
    audio.id = Math.round(Math.random() * 100000000).toString();

    audio.onended = () => {
      audio.onended = null;
    }

    audio.load();
    audio.play();
  }
}
