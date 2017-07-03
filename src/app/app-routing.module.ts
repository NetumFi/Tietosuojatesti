import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { QuestionsComponent } from './questions/questions.component';
import { IntroComponent } from './intro/intro.component';
import { UserComponent } from './user/user.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { BackingUpFromResultsNotAllowedGuard } from './backing-up-from-results-not-allowed-guard';

const routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  { path: 'front', component: FrontPageComponent },
  {
    path: 'quiz', component: QuizComponent, children: [
      { path: '', component: IntroComponent },
      { path: 'tiedot', component: UserComponent, canActivate: [BackingUpFromResultsNotAllowedGuard] },
      { path: 'kysymykset', component: QuestionsComponent, canActivate: [BackingUpFromResultsNotAllowedGuard] },
      { path: 'kysymykset/:question-number', component: QuestionsComponent, canActivate: [BackingUpFromResultsNotAllowedGuard] },
      { path: 'tulokset', component: ResultComponent, canActivate: [BackingUpFromResultsNotAllowedGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
