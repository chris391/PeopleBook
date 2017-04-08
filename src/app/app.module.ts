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


//todo add routes here
const routing = RouterModule.forRoot([
  {path: '', component: HomeComponent},
  {path: 'about', component: EditEmployeeComponent},
  {path: 'cards', component: EmployeeComponent}
]);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EditEmployeeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  // exports: [EmployeeComponent],
  providers: [DataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
