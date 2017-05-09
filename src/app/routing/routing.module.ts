import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {EditEmployeeComponent} from "../edit/edit-employee.component";
import {AddEmployeeComponent} from "../add/add-employee.component";
import {EmployeeProfileComponent} from "../profile/employee-profile.component";

const routes: Routes = [
    {path: '',redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'employees/:id', component: EditEmployeeComponent},
    //fixme
    {path: 'add', component: AddEmployeeComponent},
    {path: 'edit/:id', component: EditEmployeeComponent},
    {path: 'profile/:id', component: EmployeeProfileComponent},
    // {path: 'edit', component: EditEmployeeComponent},
];
@NgModule({
    imports: [

        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingPeopleBook {}
