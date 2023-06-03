import { ProgressTimerComponent } from './progress-timer/progress-timer.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MultipleChoiceTagSelectComponent } from './question-templates/multiple-choice-tag-select/multiple-choice-tag-select.component';
import { DragAndDropIntoContainerComponent } from './question-templates/drag-and-drop-into-container/drag-and-drop-into-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { DragAndDropIntoTagComponent } from './question-templates/drag-and-drop-into-tag/drag-and-drop-into-tag.component';
import { GetQuestionsResolver } from './resolvers/get-questions.resolver';
import { HomeComponent } from './home/home.component';
import { MultipleChoiceTextOrImageSelectComponent } from './question-templates/multiple-choice-text-or-image-select/multiple-choice-text-or-image-select.component';
import { MultipleChoiceTextOrImageSelectRandomComponent } from './question-templates/multiple-choice-text-or-image-select-random/multiple-choice-text-or-image-select-random.component';
import { MultipleChoiceVerticalAnswersComponent } from './question-templates/multiple-choice-vertical-answers/multiple-choice-vertical-answers.component';
import { MultipleChoiceImageLeftAnswersRightComponent } from './question-templates/multiple-choice-image-left-answers-right/multiple-choice-image-left-answers-right.component';
import { MultipleChoiceImageRightAnswersLeftComponent } from './question-templates/multiple-choice-image-right-answers-left/multiple-choice-image-right-answers-left.component';
import { RepeatPatternComponent } from './question-templates/repeat-pattern/repeat-pattern.component';
import { VideoAndAudioComponent } from './question-templates/video-and-audio/video-and-audio.component';
import { SpellingComponent } from './question-templates/spelling/spelling.component';
import { OrderImagesHorizontallyComponent } from './question-templates/order-images-horizontally/order-images-horizontally.component';
import { SelectCoordinatesOnImageComponent } from './question-templates/select-coordinates-on-image/select-coordinates-on-image.component';
import { DragAndDropRepeatPatternComponent } from './question-templates/drag-and-drop-repeat-pattern/drag-and-drop-repeat-pattern.component';
import { SelectAmongAllComponent } from './question-templates/select-among-all/select-among-all.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AppreciationModalComponent } from './appreciation-modal/apprecitaion-modal.component';
import { IconModalComponent } from './icon-modal/icon-modal.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { SelectMoodComponent } from './select-mood/select-mood.component';
import { ResultComponent } from './result/result.component';
import { QuizEndComponent } from './quiz-end/quiz-end.component';
import { MyErrorHandler } from './app.errorhandler';
import { LogoutConfirmationModalComponent } from './logout-confirmation-modal/logout-confirmation-modal.component';
import { DailyworkComponent } from './dailywork/dailywork.component';
import { InfoPopupComponent } from './info-popup/info-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    MultipleChoiceTagSelectComponent,
    DragAndDropIntoContainerComponent,
    DragAndDropIntoTagComponent,
    HomeComponent,
    MultipleChoiceTextOrImageSelectComponent,
    MultipleChoiceTextOrImageSelectRandomComponent,
    MultipleChoiceVerticalAnswersComponent,
    MultipleChoiceImageLeftAnswersRightComponent,
    MultipleChoiceImageRightAnswersLeftComponent,
    RepeatPatternComponent,
    VideoAndAudioComponent,
    SpellingComponent,
    OrderImagesHorizontallyComponent,
    SelectCoordinatesOnImageComponent,
    DragAndDropRepeatPatternComponent,
    SelectAmongAllComponent,
    ConfirmModalComponent,
    AppreciationModalComponent,
    ProgressTimerComponent,
    IconModalComponent,
    ProgressBarComponent,
    StartQuizComponent,
    SelectMoodComponent,
    ResultComponent,
    QuizEndComponent,
    LogoutConfirmationModalComponent,
    DailyworkComponent,
    InfoPopupComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, resolve: { questions: GetQuestionsResolver } },
    ])
  ],
  exports: [RouterModule],
  providers: [GetQuestionsResolver, { provide: ErrorHandler, useClass: MyErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
