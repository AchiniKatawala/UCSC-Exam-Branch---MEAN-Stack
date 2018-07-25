import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { ContainerComponent } from './container/container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SubjectComponent } from './subject/subject.component';
import { MatTabsModule, MatSortModule, MatTableModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SturepeatComponent } from './sturepeat/sturepeat.component';
import { StuhomeComponent } from './stuhome/stuhome.component';
import { StusubjectComponent } from './stusubject/stusubject.component';
import { StuexamComponent } from './stuexam/stuexam.component';
import { RepeatComponent } from './repeat/repeat.component';
import { FilterPipe } from './filter.pipe';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function tokenGetter() {
  return localStorage.getItem('tokenId');
};

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ContainerComponent,
    NavbarComponent,
    HomeComponent,
    SubjectComponent,
    LoginComponent,
    RegisterComponent,
    SturepeatComponent,
    StuhomeComponent,
    StusubjectComponent,
    StuexamComponent,
    RepeatComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    HttpModule,
    FormsModule,
    MatTabsModule,
    MatSortModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),

    RouterModule.forRoot([
      {
        path:'home',
        component: HomeComponent,
      },
      {
        path:'student',
        component: StudentComponent,
      },
      {
        path:'subject',
        component: SubjectComponent,
      },
      {
        path: 'repeat',
        component: RepeatComponent
      },
      {
        path: 'sturepeat',
        component: SturepeatComponent
      },
      {
        path: 'stuhome',
        component: StuhomeComponent
      },
      {
        path: 'stusubject',
        component: StusubjectComponent
      },
      {
        path: 'stuexam',
        component: StuexamComponent
      }
    ]),
    RouterModule.forRoot(appRoutes, {useHash: false})




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
