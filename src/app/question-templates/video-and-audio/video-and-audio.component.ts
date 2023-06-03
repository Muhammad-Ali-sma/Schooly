import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import helper from 'src/app/helper';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/types/Question';

@Component({
  selector: 'app-video-and-audio',
  templateUrl: './video-and-audio.component.html',
  styleUrls: ['./video-and-audio.component.css']
})
export class VideoAndAudioComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionVerified!: boolean;

  public videoStarted = false;
  public videoFinished = false;
  public audioPlaying = false;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.setCheckIfAnsweredCorrectlyFunction = this.verifyQuestion.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question) {
      this.question.data.answers.filter((x: any) => x.selected = false);
    }
  }

  verifyQuestion() {
    let correct = true;
    this.question.data.answers.forEach((answer: any) => {
      if (!((answer.correct && answer.selected) || (!answer.correct && !answer.selected))) correct = false;
    });
    return correct;
  }

  selectAnswer(answer: any) {
    helper.selectAnswer(answer);
  }

  setAnswerStyle(answer: any) {
    if (this.questionVerified && answer.correct) return { 'background-color': 'green' };
    if (this.questionVerified && !answer.correct && answer.selected) return { 'background-color': 'red' };
    return { 'background-color': '', 'display': 'none' };
  }

  checkIfAnsweredCorrectly(answer: any) {
    return (answer.correct && answer.selected) || (!answer.correct && !answer.selected);
  }

  playVideo() {
    if (this.videoStarted) return;
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    videoElement.onended = () => {
      this.videoFinished = true;
    }
    videoElement.play();
    this.videoStarted = true;
  }

  async playAudio() {
    if (this.question.data.audio && this.question.data.audio !== '' && !this.audioPlaying) {
        const res = await helper.playAudio(this.question.data.audio);
        this.audioPlaying = true;
        setTimeout(() => this.audioPlaying = false, res.duration * 1000);
    }
} 
}
