<<<<<<< HEAD

=======
;
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
import { EmployeeProfileComponent } from './profile/employee-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import {EmployeeThumbnailComponent} from "./thumbnail/employee-thumbnail.component";
import { DataService } from './services/data.service'
import {HomeComponent} from "./home/home.component";
import {EditEmployeeComponent} from "./edit/edit-employee.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {ToastComponent} from "./shared/toast/toast.component";
import {AddEmployeeComponent} from "./add/add-employee.component";
<<<<<<< HEAD
import {FilterEmployees} from "./pipes/filter-employees.pipe";
=======
import {FilterEmployees} from "./home/filter-employees.pipe";
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
import {SharedService} from "./shared/service/shared-service";
import {RoutingPeopleBook} from "./routing/routing.component";
import {Capitalized} from "./pipes/capitalized.pipe";




//todo add routes here
const routing = RouterModule.forRoot([
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'employees/:id', component: EditEmployeeComponent},
  //fixme
  {path: 'add', component: AddEmployeeComponent},
  {path: 'edit/:id', component: EditEmployeeComponent},
  {path: 'profile/:id', component: EmployeeProfileComponent},
  // {path: 'edit', component: EditEmployeeComponent},
]);

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
    FilterEmployees,
<<<<<<< HEAD
    EmployeeProfileComponent,
    Capitalized



=======
    EmployeeProfileComponent
>>>>>>> parent of e6639ec... PB-0 tests for add-employee, edit-employee tests added
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule

  ],
  // exports: [EmployeeThumbnailComponent],
  providers: [SharedService, DataService, HomeComponent, ToastComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
