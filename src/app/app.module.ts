import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import {EmployeeComponent} from "./person/employee.component";
import { DataService } from './services/data.service'
import {HomeComponent} from "./home/home.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {ToastComponent} from "./shared/toast/toast.component";
import {AddEmployeeComponent} from "./add/add-employee.component";
import {FilterEmployees} from "./home/filter-employees.pipe";
import {NodeService} from "./shared/service/subject-service";
import { EmployeeProfileComponent } from './profile/employee-profile.component';



//todo add routes here
const routing = RouterModule.forRoot([
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'employees/:id', component: EditEmployeeComponent},
  //fixme
  {path: 'add', component: AddEmployeeComponent},
  {path: 'edit/:id', component: EditEmployeeComponent},
  // {path: 'edit', component: EditEmployeeComponent},
]);

@NgModule({
  declarations: [
    AppComponent,
    //todo thumbnail employee component
    EmployeeComponent,
    //todo add detail employee component

    EditEmployeeComponent,
    HomeComponent,
    ToastComponent,
    AddEmployeeComponent,
    FilterEmployees,
    EmployeeProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],

  // exports: [EmployeeComponent],
  providers: [AppComponent, NodeService, DataService, HomeComponent, ToastComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
