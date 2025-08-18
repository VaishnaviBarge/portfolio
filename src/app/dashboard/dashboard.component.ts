import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  originalVx: number;
  originalVy: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  showElement = true;
  isDarkMode = false;
  activeSection = 'intro';
  
  // Typing animation properties
  roles = ['Full Stack Developer', 'Angular Developer', 'Java Developer', 'Frontend Devloper', 'Backend Devloper','React Devloper'];
  displayText = '';
  private currentRoleIndex = 0;
  private isTyping = true;
  private typingSpeed = 100;
  private eraseSpeed = 50;
  private changeDelay = 2000;
  
  // Particle system properties (keeping your existing code)
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private mouseX = -10000;
  private mouseY = -10000;
  private repelRadius = 550;
  private repelForce = 5;

  private colors = [
    'rgba(195, 174, 245, 0.6)', // Purple
    'rgba(205, 242, 248, 0.6)',  // Cyan
    'rgba(16, 185, 129, 0.6)', // Green
    'rgba(252, 210, 137, 0.6)', // Yellow
    'rgba(250, 133, 133, 0.6)',  // Red
    'rgba(208, 174, 240, 0.5)', // Light purple
    'rgba(34, 197, 94, 0.5)',  // Light green
    'rgba(252, 223, 150, 0.5)'  // Light yellow
  ];

  // Skills and experience data
  skills = [
    { name: 'Angular', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'Java', level: 80, category: 'Backend' },
    { name: 'Supabase', level: 75, category: 'Database' },
    { name: 'Next.js', level: 70, category: 'Framework' },
    { name: 'Prisma ORM', level: 65, category: 'Database' }
  ];

  experience = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      period: '2023 - Present',
      description: 'Developing responsive web applications using Angular and modern JavaScript frameworks.'
    },
    {
      title: 'Java Developer Intern',
      company: 'Software Corp',
      period: '2022 - 2023',
      description: 'Worked on backend systems using Java and Spring framework, focusing on API development.'
    }
  ];

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  navigateToSection(section: string) {
    this.activeSection = section;
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const introSection = document.getElementById('intro');
    const aboutSection = document.getElementById('about');
    
    if (introSection && aboutSection) {
      const scrollY = window.scrollY;
      const introBottom = introSection.offsetTop + introSection.offsetHeight / 2;
      
      if (scrollY < introBottom) {
        this.activeSection = 'intro';
      } else {
        this.activeSection = 'about';
      }
    }
  }
  
  ngOnInit(): void {
    this.typeText();
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (this.canvas) {
      this.resizeCanvas();
    }
  }

  // Keeping your existing particle system methods unchanged
  private initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement!;
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
  }

  private createParticles(): void {
    const particleCount = 30;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 6 + 2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        originalVx: 0,
        originalVy: 0
      };
      
      particle.originalVx = particle.vx;
      particle.originalVy = particle.vy;
      
      this.particles.push(particle);
    }
  }

  private updateParticles(): void {
    this.particles.forEach(particle => {
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.repelRadius && distance > 0) {
        const force = Math.pow((this.repelRadius - distance) / this.repelRadius, 2);
        const repelX = -(dx / distance) * force * this.repelForce;
        const repelY = -(dy / distance) * force * this.repelForce;
        
        particle.vx = particle.originalVx + repelX;
        particle.vy = particle.originalVy + repelY;
        
        if (distance < this.repelRadius * 0.3) {
          const extraBoost = 4;
          particle.vx += -(dx / distance) * extraBoost;
          particle.vy += -(dy / distance) * extraBoost;
        }
      } else {
        particle.vx += (particle.originalVx - particle.vx) * 0.03;
        particle.vy += (particle.originalVy - particle.vy) * 0.03;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= particle.size || particle.x >= this.canvas.width - particle.size) {
        particle.vx *= -1;
        particle.originalVx *= -1;
        particle.x = Math.max(particle.size, Math.min(this.canvas.width - particle.size, particle.x));
      }
      if (particle.y <= particle.size || particle.y >= this.canvas.height - particle.size) {
        particle.vy *= -1;
        particle.originalVy *= -1;
        particle.y = Math.max(particle.size, Math.min(this.canvas.height - particle.size, particle.y));
      }

      if (Math.random() < 0.002) {
        particle.originalVx += (Math.random() - 0.5) * 0.2;
        particle.originalVy += (Math.random() - 0.5) * 0.2;
        
        const maxVel = 3;
        particle.originalVx = Math.max(-maxVel, Math.min(maxVel, particle.originalVx));
        particle.originalVy = Math.max(-maxVel, Math.min(maxVel, particle.originalVy));
      }
    });
  }

  private drawParticles(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  private animate(): void {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
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