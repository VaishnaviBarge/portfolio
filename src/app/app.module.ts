import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,               
    BrowserAnimationsModule,     
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]       
})
export class AppModule { }
