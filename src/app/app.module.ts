import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import {EmployeeComponent} from "./person/employee.component";
import { DataService } from './services/data.service'
import {HomeComponent} from "./home/home.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import {PlayComponent} from "./play-zone/play.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


//todo add routes here
const routing = RouterModule.forRoot([
  {path: '', component: HomeComponent},
  {path: 'about', component: EditEmployeeComponent},
  {path: 'cards', component: EmployeeComponent},
  {path: 'play', component: PlayComponent}
]);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EditEmployeeComponent,
    HomeComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  // exports: [EmployeeComponent],
  providers: [DataService, HomeComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
