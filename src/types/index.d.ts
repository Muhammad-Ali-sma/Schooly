import { Question } from "src/app/types/Question";

export {};

declare global {
  interface Window {
    questionList: Question[];
    easyQuestionList: Question[];
    medQuestionList: Question[];
    hardQuestionList: Question[];
  }
}