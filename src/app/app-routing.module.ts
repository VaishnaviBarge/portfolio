import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component:DashboardComponent
  },
  {
    path:'skill', component:SkillsComponent
  },
  {
    path:'project', component:ProjectsComponent
  },
  {
    path:'experience', component:ExperienceComponent
  },
  {
    path:'education', component:EducationComponent
  },
  {
    path:'contact', component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
