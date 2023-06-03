import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  checkIfAnsweredCorrectly(): boolean { return true; }

  set setCheckIfAnsweredCorrectlyFunction(func: any) { this.checkIfAnsweredCorrectly = func; }
}
