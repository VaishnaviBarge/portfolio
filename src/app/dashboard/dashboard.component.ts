import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ISourceOptions } from "tsparticles-engine";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  id = "tsparticles-dashboard";
  showElement = true;
  isDarkMode = false; 
  roles = ['Web Developer', 'Java Developer'];
  displayText = '';
  private currentRoleIndex = 0;
  private isTyping = true;
  private typingSpeed = 100; 
  private eraseSpeed = 50; 
  private changeDelay = 2000;

  particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: "#282c34"
      }
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode; 
    const htmlElement = document.documentElement; 

    if (this.isDarkMode) {
      htmlElement.classList.add('dark'); 
    } else {
      htmlElement.classList.remove('dark'); 
    }
  }
  
  ngOnInit(): void {
    this.typeText();
    
  }

  private typeText(): void {
    const currentRole = this.roles[this.currentRoleIndex];
    if (this.isTyping) {
      this.displayText += currentRole.charAt(this.displayText.length);
      if (this.displayText.length === currentRole.length) {
        this.isTyping = false;
        setTimeout(() => this.typeText(), this.changeDelay);
      } else {
        setTimeout(() => this.typeText(), this.typingSpeed);
      }
    } else {
      if (this.displayText.length === 0) {
        this.isTyping = true;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        setTimeout(() => this.typeText(), this.changeDelay);
      } else {
        this.displayText = currentRole.substring(0, this.displayText.length - 1);
        setTimeout(() => this.typeText(), this.eraseSpeed);
      }
    }
  }
}
