import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { CreateclassroomComponent } from './components/createclassroom/createclassroom.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"login", component: LoginComponent },
  { path:"dashboard", component: DashboardComponent},
  { path:"class/:id", component: ClassroomComponent},
  { path:"test", component: CreateclassroomComponent},
  { path:"**", component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
