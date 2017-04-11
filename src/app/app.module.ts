import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { UserComponent } from './user/user.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResultComponent } from './result/result.component';
import { RouterModule } from '@angular/router';
import { QuestionService } from './question.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimePipe } from './time.pipe';
import { TimerComponent } from './timer/timer.component';

const appRoutes = [
  { path: '', component: IntroComponent },
  { path: 'tiedot', component: UserComponent },
  { path: 'kysymykset', component: QuestionsComponent },
  { path: 'kysymykset/:index', component: QuestionsComponent },
  { path: 'tulokset', component: ResultComponent }
];

@NgModule({
  declarations: [
    TimePipe,
    AppComponent,
    IntroComponent,
    UserComponent,
    QuestionsComponent,
    ResultComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
