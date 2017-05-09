import {RoutingPeopleBook} from "./routing/routing.module";

import { EmployeeProfileComponent } from './profile/employee-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {EmployeeThumbnailComponent} from "./thumbnail/employee-thumbnail.component";
import { DataService } from './services/data.service'
import {HomeComponent} from "./home/home.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {ToastComponent} from "./shared/toast/toast.component";
import {AddEmployeeComponent} from "./add/add-employee.component";
import {FilterEmployeesPipe} from "./pipes/filter-employees.pipe";
import {SharedService} from "./shared/service/shared-service";


@NgModule({
  declarations: [
    AppComponent,
    //todo summary employee component
    EmployeeThumbnailComponent,
    //todo add detail employee component

    EditEmployeeComponent,
    HomeComponent,
    ToastComponent,
    AddEmployeeComponent,
    FilterEmployeesPipe,
    EmployeeProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RoutingPeopleBook

  ],
  // exports: [EmployeeThumbnailComponent],
  providers: [SharedService, DataService, HomeComponent, ToastComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
