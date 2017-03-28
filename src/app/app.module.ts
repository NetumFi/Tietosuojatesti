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

const appRoutes = [
  { path: '', component: IntroComponent },
  { path: 'tiedot', component: UserComponent },
  { path: 'kysymykset', component: QuestionsComponent },
  { path: 'kysymykset/:index', component: QuestionsComponent },
  { path: 'tulokset', component: ResultComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    UserComponent,
    QuestionsComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
