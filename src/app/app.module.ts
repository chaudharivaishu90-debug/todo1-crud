import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Todo1Component } from './components/todo1/todo1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule} from "@angular/material/button";
import{MatIconModule} from "@angular/material/icon";
import{MatSnackBarModule} from "@angular/material/snack-bar";
import { Student1Component } from './components/student1/student1.component';
@NgModule({
  declarations: [
    AppComponent,
    Todo1Component,
    Student1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
