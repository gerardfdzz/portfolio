import { Component, OnInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  displayedText = signal('');
  private fullText = 'Frontend Developer';
  private typewriterInterval: ReturnType<typeof setInterval> | null = null;
  private animFrame: number | null = null;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  readonly stats = [
    { value: '4+', label: 'Years of experience' },
    { value: '2+', label: 'At Vueling' },
    { value: '3', label: 'Languages' },
  ];

  readonly techBadges = ['Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'Cypress', 'CI/CD'];

  ngOnInit() {
    this.initCanvas();
    this.startTypewriter();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  private startTypewriter() {
    let i = 0;
    setTimeout(() => {
      this.typewriterInterval = setInterval(() => {
        if (i < this.fullText.length) {
          this.displayedText.update(t => t + this.fullText[i]);
          i++;
        } else {
          if (this.typewriterInterval) clearInterval(this.typewriterInterval);
        }
      }, 80);
    }, 800);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();
    this.animateParticles();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles() {
    this.particles = [];
    const count = Math.floor(window.innerWidth / 12);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private animateParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
      this.ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animFrame = requestAnimationFrame(() => this.animateParticles());
  }
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
}
