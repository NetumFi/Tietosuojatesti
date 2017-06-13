import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { UserComponent } from './user/user.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResultComponent } from './result/result.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimePipe } from './time.pipe';
import { TimerComponent } from './timer/timer.component';
import { QuestionComponent } from './question/question.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers';
import { CertificateComponent } from './certificate/certificate.component';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { AppRoutingModule } from './app-routing.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { LanguageService } from './language.service';
import { QuizComponent } from './quiz/quiz.component';
import { FooterComponent } from './footer/footer.component';


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
    FrontPageComponent,
    HeaderBarComponent,
    QuizComponent,
    FooterComponent
  ],
  providers: [
    LanguageService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ShareButtonsModule.forRoot(),
    ButtonsModule.forRoot(),
    AppRoutingModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
