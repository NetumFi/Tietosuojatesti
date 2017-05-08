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
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimePipe } from './time.pipe';
import { TimerComponent } from './timer/timer.component';
import { QuestionComponent } from './question/question.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers';
import { CertificateComponent } from './certificate/certificate.component';
import { OlxDateFormatPipe } from './olx-date-format.pipe';

const appRoutes = [
  { path: '', component: IntroComponent },
  { path: 'tiedot', component: UserComponent },
  { path: 'kysymykset', component: QuestionsComponent },
  { path: 'kysymykset/:question-number', component: QuestionsComponent },
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
    TimerComponent,
    QuestionComponent,
    CertificateComponent,
    OlxDateFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
