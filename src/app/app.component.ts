import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideDown', [
      state('void', style({ 
        opacity: 0, 
        transform: 'translateY(-20px)' 
      })),
      transition(':enter', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ 
            opacity: 1, 
            transform: 'translateY(0)' 
          })
        )
      ]),
      transition(':leave', [
        animate('200ms ease-in', 
          style({ 
            opacity: 0, 
            transform: 'translateY(-10px)' 
          })
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'PortfolioApp';
  isDarkMode: boolean = false;
  menuOpen = false;

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerButton = document.querySelector('.hamburger');
    
    if (this.menuOpen && 
        mobileMenu && 
        hamburgerButton && 
        !mobileMenu.contains(target) && 
        !hamburgerButton.contains(target)) {
      this.menuOpen = false;
    }
  }

  // Close mobile menu on route change (optional)
  onRouteChange() {
    this.menuOpen = false;
  }
}